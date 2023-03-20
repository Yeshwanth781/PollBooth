from flask import Blueprint
from flask import jsonify,request
#defing bluprint
poll_bp=Blueprint('poll_bp',__name__)
from models import *

# get all polls in a team
@poll_bp.get('/all/<int:teamid>')
def Get_Polls(teamid):
    try:
      data=teams.query.filter_by(teamid=teamid).first().polls
      data=jsonify([x.to_json() for x in data])
      return data.json,200  
    except Exception as e:
        return {'messege':str(e)}


@poll_bp.post('/add/<int:teamid>')
def Add_Poll(teamid):
    try:
        data=request.json
        pollname=data['pollname']
        t=teams.query.filter_by(teamid=teamid).first()
        p=polls(pollname=pollname,teamid=teamid)
        t.polls.append(p)
        db.session.commit()
        return {'messege':'Poll Added Successfully'},200
    except Exception as e:
        return {'messege':str(e)},400


@poll_bp.post('/addoption/<int:pollid>')
def Add_Option(pollid):
    try:
        data=request.json
        optionname=data['optionname']
        t=polls.query.filter_by(pollid=pollid).first()
        p=Options(optionname=optionname,votes=0)
        t.options.append(p)
        db.session.commit()
        return {'messege':'Option Added Successfully'},200
    except Exception as e:
        return {'messege':str(e)},400


@poll_bp.get('/getpollDetails/<int:pollid>')
def Get_Poll_Details(pollid):
    try:
      data=polls.query.filter_by(pollid=pollid).first().options
      data=jsonify([x.to_json() for x in data])
      return data.json,200  
    except Exception as e:
        return {'messege':str(e)}

@poll_bp.put('/vote/<int:optionid>')
def Vote(optionid):
    try:
        op=Options.query.filter_by(optionid=optionid).first()
        op.votes+=1
        db.session.commit()
        return {'messege':'Vote Recorded Successfully'},200
    except Exception as e:
        return {'messege':str(e)},400