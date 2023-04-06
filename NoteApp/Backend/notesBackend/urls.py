from django.urls import path
from . import views
urlpatterns = [
    path("note/", views.notes),
    path("note/<str:pk>/", views.getNote),
    path("note/<str:pk>/update", views.updateNote),
    path("note/<str:pk>/delete", views.deleteNote),
    path("note/createNote", views.createNote),
]
