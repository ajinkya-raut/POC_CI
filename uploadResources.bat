@echo off

cd static_resources
del ..\src\staticresources\FoundationConnect.resource
7z a -tzip -r ..\src\staticresources\FoundationConnect.resource *
cd ..\src\staticresources
dir
echo ^<?xml version="1.0" encoding="UTF-8"?^>^<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata"^>^<cacheControl^>Public^</cacheControl^>^<contentType^>application/x-zip-compressed^</contentType^>^</StaticResource^> >
pause