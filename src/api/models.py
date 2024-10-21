from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    

class Critico(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=True, nullable=False)
    apellido = db.Column(db.String(80), unique=False, nullable=False)
    genero = db.Column(db.String(80), unique=False, nullable=False)
    acerca_de_mi = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
   

    def __repr__(self):
        return '<Critico %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "genero": self.genero,
            "acerca_de_mi": self.acerca_de_mi,
            "email": self.email,
           
            # do not serialize the password, its a security breach
        }


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)  
    cantidad_paginas = db.Column(db.Integer, nullable=False)
    genero = db.Column(db.String(80), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    autor = db.Column(db.String(120), nullable=False)
    cover = db.Column(db.String(200), nullable=False)  

    def __repr__(self):
        return f'<Libro {self.autor} - {self.genero}>'

    def serialize(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "cantidad_paginas": self.cantidad_paginas,
            "genero": self.genero,
            "year": self.year,
            "autor": self.autor,
            "cover": self.cover
        }
