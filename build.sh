curl https://github.com/jwerre/node-canvas-lambda/releases/download/v2.0.0/node16_canvas_lib64_layer_x86_64.zip -O -L 

unzip -j -d lib64 node16_canvas_lib64_layer_x86_64.zip 


cp lib64/* node_modules/canvas/build/Release/ 


yum install libuuid-devel libmount-devel zlib 
yum reinstall zlib

cp /lib64/{libuuid,libmount,libblkid,libz}.so.1 node_modules/canvas/build/Release/


ls node_modules/canvas/build/Release/ 

echo $LD_LIBRARY_PATH
echo $LD_PRELOAD

yarn next build

