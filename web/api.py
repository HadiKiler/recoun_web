from django.shortcuts import render
from django.http import JsonResponse
from .recoun.main import recoun

def api_main(request):
    if request.method == "GET":
        url = request.GET.get('url')
        if not url:
            return JsonResponse({'status':404})
        try:
            informaions = recoun(url)
            informaions = informaions | {'status':200}
            return JsonResponse(informaions)
        except:
            return JsonResponse({'status':400})