import os,random
import app.mod1.Complete_PDB as Complete_PDB
import app.mod2.cell_list.Cell_List as Cell_List
import app.mod3.Align as Align
import app.mod3.Remove as Remove

from flask import Flask, render_template, redirect, request, json
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'ent'}

# User Input and Output stored in separate directories accessed using UIDs

#uid='uid_730/'
uid='uid_'+str(random.randint(0,1000))+'/'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(UPLOAD_FOLDER, uid) 

# Progress Variables
msg='Waiting for Input..'
percent=0

# Verifying User File Inputs 
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def status(m,p):
    global msg,percent
    msg,percent=m,p

# Default Page / Reset Progress Variables
@app.route("/")
def index():
    status('Waiting for Input..',0)
    return render_template("index.html")

# Response to AJAX (JSON with Progress Variables) 
@app.route('/progress',methods = ['GET','POST'])
def progress():
    if request.method == 'POST': 
        return json.dumps({'status':'OK','msg':msg,'percent':percent})

# Upload Function
@app.route('/upload',methods = ['GET','POST'])
def upload_file():

    if request.method =='POST':

        status('Uploading Files..',0)

        # Make Directories in Input and Output corresponding to UID

        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.mkdir(app.config['UPLOAD_FOLDER'])

        for dir in os.listdir('output'):
            d = os.path.join('output',dir,uid)

            if not os.path.exists(d):
                os.mkdir(d)

        # File Upload Code
        files = request.files.getlist('fileUpload')

        for file in files:
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    file_path=os.path.join(app.config['UPLOAD_FOLDER'],filename)
                    file.save(file_path)

        # Execution of Content Code
        status('Repairing PDBs..',20)   
        Complete_PDB.main(uid)

        status('Generating Cell List..',20)

        Cell_List.segregate(uid)
        Cell_List.main("67")
        status('Generating Cell List..',40)
        Cell_List.main("133")
            
        status('Sorting Files..',60)
        Align.main("67",uid)
        status('Sorting Files..',70)
        
        Align.main("133",uid)

        status('Removing Inter-Spike Pairs..',80)
        Remove.main("67",uid)
        status('Removing Inter-Spike Pairs..',90)
        Remove.main("133",uid)

        status('Done',100)

    return redirect('/')
        
if __name__ == '__main__':
	app.run(debug=True)
