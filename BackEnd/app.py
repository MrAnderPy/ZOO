from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)  # Habilitar CORS para toda la aplicación

# Conectar a MongoDB Atlas
client = MongoClient('mongodb+srv://anderssonrojas56:1034918767@cluster0.rsrxu.mongodb.net/')
db = client['zoo']
collection = db['animals']

# Crear un nuevo animal

@app.route('/animals', methods=['POST'])
def add_animal():
    data = request.get_json()

    # Verificar que todos los campos estén presentes y no vacíos
    if not all(key in data and data[key] for key in ('name', 'species', 'age', 'habitat')):
        return jsonify({'error': 'All fields are required and cannot be empty'}), 400

    # Verificar que la edad sea un número entero
    try:
        age = int(data['age'])
    except ValueError:
        return jsonify({'error': 'Age must be a number'}), 400

    animal = {
        'name': data['name'],
        'species': data['species'],
        'age': age,
        'habitat': data['habitat']
    }

    result = collection.insert_one(animal)
    return jsonify({'_id': str(result.inserted_id)}), 201
# Obtener todos los animales
@app.route('/animals', methods=['GET'])
def get_animals():
    animals = list(collection.find())
    for animal in animals:
        animal['_id'] = str(animal['_id'])
    return jsonify(animals), 200

# Obtener un animal por ID
@app.route('/animals/<id>', methods=['GET'])
def get_animal(id):
    animal = collection.find_one({'_id': ObjectId(id)})
    if animal:
        animal['_id'] = str(animal['_id'])
        return jsonify(animal), 200
    else:
        return jsonify({'error': 'Animal not found'}), 404

# Editar un animal por ID
@app.route('/animals/<id>', methods=['PUT'])
def update_animal(id):
    data = request.get_json()
    updated_animal = {
        'name': data['name'],
        'species': data['species'],
        'age': data['age'],
        'habitat': data['habitat']
    }
    result = collection.update_one({'_id': ObjectId(id)}, {'$set': updated_animal})
    if result.matched_count:
        return jsonify({'message': 'Animal updated successfully'}), 200
    else:
        return jsonify({'error': 'Animal not found'}), 404

# Eliminar un animal por ID
@app.route('/animals/<id>', methods=['DELETE'])
def delete_animal(id):
    result = collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count:
        return jsonify({'message': 'Animal deleted successfully'}), 200
    else:
        return jsonify({'error': 'Animal not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
