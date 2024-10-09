from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from pharmacies.models import Pharmacy
from anims.models import Anim
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view
from rest_framework.response import Response
from anims.serializers import AnimSerializer

endpoint = "http://127.0.0.1:8000/"


@api_view(['GET', 'POST'])
def api_home(request, *args, **kwargs):
    """
    Api View
    :param request:
    :param args:
    :param kwargs:
    :return:
    """
    input_data = ''
    serializer = AnimSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        input_instance = serializer.save()
        input_data = serializer.data
    instance = Anim.objects.all().order_by("?").first()
    pharm_model_data = Pharmacy.objects.all().order_by("?").first()
    data = {}
    if instance:
        data['anim'] = AnimSerializer(instance).data
        data['parm'] = model_to_dict(pharm_model_data)
        data['input'] = input_data
    return Response(data)


