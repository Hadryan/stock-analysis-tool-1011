import datetime
import os
import multiprocessing
import subprocess
print(datetime.datetime.now())
print(os.getcwd())
print(multiprocessing.cpu_count())
for dirname, _, filenames in os.walk(os.getcwd()):
    for filename in filenames:
        print(os.path.join(dirname, filename))
    
