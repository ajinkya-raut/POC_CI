@echo off

cd static_resources
del ..\src\staticresources\FoundationConnect.resource
7z a -tzip -r ..\src\staticresources\FoundationConnect.resource *
pause