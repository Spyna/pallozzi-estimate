curl https://github.com/jwerre/node-canvas-lambda/releases/download/v2.0.0/node16_canvas_lib64_layer_x86_64.zip -O -L 

unzip -j -d lib64 node16_canvas_lib64_layer_x86_64.zip 

cp lib64/* node_modules/canvas/build/Release/ 

ls node_modules/canvas/build/Release/ 

yarn next build