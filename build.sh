yum install libuuid-devel libmount-devel zlib 
yum reinstall zlib

LD_LIBRARY_PATH=/var/task/node_modules/canvas/build/Release

cp /lib64/{libuuid,libmount,libblkid,libz}.so.1 node_modules/canvas/build/Release/

yarn next build

