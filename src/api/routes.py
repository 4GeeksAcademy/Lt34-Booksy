"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Lector
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/lector', methods=['GET'])
def get_lector():

    all_lector = Lector.query.all()
    results = list(map(lambda reader: reader.serialize(), all_lector))
    

    return jsonify(results), 200

@api.route('/lector', methods=['POST'])
def add_lector():
    body = request.get_json()  

    if not body:
        return jsonify({"msg": "No se proporcionó información"}), 400

    required_fields = ['name', 'lastname', 'email', 'password', 'suscription_date', 'is_active']
    missing_fields = [field for field in required_fields if field not in body]
    if missing_fields:
        return jsonify({"msg": f"Faltan los siguientes campos: {', '.join(missing_fields)}"}), 400

    nuevo_lector = Lector(
        name=body['name'],
        lastname=body['lastname'],
        email=body['email'],
        password=body['password'], 
        suscription_date=body['suscription_date'],
        is_active=body['is_active']
    )

    try:
        db.session.add(nuevo_lector)
        db.session.commit() 
    except Exception as e:
        return jsonify({"msg": "Este Lector ya fue creado"}), 500

    response_body = {
        "msg": "Lector creado exitosamente",
        "lector": nuevo_lector.serialize() 
    }
    
    return jsonify(response_body), 201  

@api.route('/lector/<int:lector_id>', methods=['DELETE'])
def delete_lector(lector_id):
    lector = Lector.query.filter_by(id=lector_id).first()
    
    if lector is None:
        return jsonify({"error": "Lector no encontrado"}), 404
    

    
    db.session.delete(lector)
    db.session.commit()

    response_body={
        "msg": "Se elimino lector"
    }

    return jsonify(response_body), 200
    