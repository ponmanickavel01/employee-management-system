from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ems.db'
db = SQLAlchemy(app)

# Models
class Department(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    salary = db.Column(db.Float, nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)

# Create DB tables
with app.app_context():
    db.create_all()

# Routes
@app.route('/departments', methods=['POST'])
def add_department():
    data = request.json
    dept = Department(name=data['name'])
    db.session.add(dept)
    db.session.commit()
    return jsonify({'message': 'Department added'}), 201

@app.route('/employees', methods=['POST'])
def add_employee():
    data = request.json
    emp = Employee(name=data['name'], salary=data['salary'], department_id=data['department_id'])
    db.session.add(emp)
    db.session.commit()
    return jsonify({'message': 'Employee added'}), 201

@app.route('/employees', methods=['GET'])
def list_employees():
    employees = Employee.query.all()
    result = []
    for e in employees:
        dept = Department.query.get(e.department_id)
        result.append({
            'id': e.id,
            'name': e.name,
            'salary': e.salary,
            'department': dept.name
        })
    return jsonify(result)

@app.route('/analytics', methods=['GET'])
def analytics():
    departments = Department.query.all()
    result = []
    for dept in departments:
        emps = Employee.query.filter_by(department_id=dept.id).all()
        if emps:
            highest_paid = max(emps, key=lambda x: x.salary)
            avg_salary = sum(e.salary for e in emps) / len(emps)
            result.append({
                'department': dept.name,
                'highest_paid_employee': highest_paid.name,
                'average_salary': avg_salary
            })
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
