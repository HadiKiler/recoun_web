import time,os
import argparse
from .tools.sitemap import *
from .tools.who_is import *
from .tools.wappalyzer import *
from .tools.gowitness import *
from .tools.subdomainTools.subdomains import *
from concurrent.futures import ThreadPoolExecutor
execute = ThreadPoolExecutor()


def recoun(url):
    if 'https://' in url:
        url = url.replace('https://','')
    elif 'http://' in url:
        url =  url.replace('http://','')    
    if 'www.' in url:
        url = url.replace('www.','')
        
    witness_path = os.path.join(Path(__file__).parent.parent.parent, 'static/images')
    subdoamin_path = os.path.join(Path(__file__).parent , 'tools/subdomainTools/subdomains.txt')
    start = time.time()

    functions = {
        get_crawl:[url],
        get_subdomains: [url, subdoamin_path],
        go_witness: [url, witness_path],
        get_whois:[url],
        get_wappalyzer:[url]
        }

    informations = {
        'domain': url
    }
    names = ['links','subdomains', 'gowitness', 'whois', 'wappalyzer']
    tasks = [execute.submit(fun,*argument) for fun,argument in functions.items()]

    for key, value in dict(zip(names, tasks)).items():
        informations[key] = value.result()
    
    informations['time'] = time.time()-start

    # print(informations['domain'])
    # print('------------------------------------------------------------')
    # for link in informations['links']:
    #     print(link)
    # print('------------------------------------------------------------')
    # for subdomain in informations['subdomains']:
    #     print(subdomain)
    # print('------------------------------------------------------------')
    # for key, value in informations['whois'].items():
    #     print(f'{key}: {value}')
    # print('------------------------------------------------------------')
    # for key, value in informations['wappalyzer'].items():
    #     print(f'{key}: {value}')
    # print('------------------------------------------------------------')
    # print(informations['gowitness'])
    # print(informations['time'])
    return informations











