from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import noteSerializer


@api_view(["GET"])
def notes(request):
    note = Note.objects.all()
    serializer = noteSerializer(note, many=True).data
    return Response(serializer)


@api_view(["GET"])
def getNote(request, pk):
    note = Note.objects.get(id=pk)
    serializer = noteSerializer(note, many=False).data
    return Response(serializer)


@api_view(["PUT"])
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = noteSerializer(instance=note, data=data)
    print(note)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["DELETE"])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response({"Response": "NOTE IS DELETED"})


@api_view(["POST"])
def createNote(request):
    # data = request.data
    # print(data)
    # serializer = noteSerializer(data=data)
    # if serializer.is_valid():
    #     serializer.save()
    # return Response({"response": "note is created"})
    data = request.data
    print(data['body'])
    note = Note.objects.create(
        title = data['title'],
        body = data['body']

    )
    serializer = noteSerializer(note, many=True)
    return Response(serializer.data)
