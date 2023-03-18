from flask import Blueprint

#defing bluprint
poll_bp=Blueprint('poll_bp',__name__)

@poll_bp.get('/')
def hello():
    return 'kopllllpp'