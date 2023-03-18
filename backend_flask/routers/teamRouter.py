from flask import Blueprint,jsonify
from app import app,db
from models import *
#defing bluprint
team_bp=Blueprint('team_bp',__name__)

@team_bp.get('/<user_id>')
def Get_Teams(user_id):
    try:
        data=users.query.filter_by(id=user_id).first().teams
        data=jsonify([x.to_json() for x in data])
        return data,200
    except Exception as e:
        return {'messege':str(e)},400

@team_bp.post('/add')
def Add_Team():
    try:
        data=request.json
        creator=data['userid']
        teamname=data['teamname']
        u=users.query.filter_by(id=creator).first()
        t=teams(teamname=teamname,creator=creator)
        t.members.append(u)
        db.session.add(t)
        db.session.commit()
        return {'messege':'Team Added Successfully'},200
    except Exception as e:
        return {'messege':str(e)},400
