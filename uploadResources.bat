@echo off

set PATH=%PATH%;C:\Program Files\7-Zip\
echo %PATH%


@echo off

cd static_resources
del ..\src\staticresources\FC_CI_New.resource
7z a -tzip -r ..\src\staticresources\FC_CI_New.resource *
cd ..\src\staticresources
dir
echo ^<?xml version="1.0" encoding="UTF-8"?^>^<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata"^>^<cacheControl^>Public^</cacheControl^>^<contentType^>application/x-zip-compressed^</contentType^>^</StaticResource^> >FC_CI_New.resource-meta.xml
