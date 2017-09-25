var fsObj = new ActiveXObject("Scripting.FileSystemObject");
var mdbPath = fsObj.GetAbsolutePathName(WScript.Arguments(0));
WScript.Echo("Path=" + mdbPath);
var access = new ActiveXObject("Access.Application");
var rs = null;
try{
    access.Visible = true;
    access.OpenCurrentDatabase(mdbPath);

    var db = access.CurrentDb();
    rs = db.OpenRecordset( "SELECT * FROM [DENSEN]" );
    while( ! rs.Eof ){
        WScript.Echo( rs("[線種ID]")+","+rs("[ｻｲｽﾞID]")+","+rs("[電線自重]") );
        rs.MoveNext();
    }
}finally{
    if( rs != null ){
        rs.Close();
        rs = null;
    }
    if( access != null ){
        access.CloseCurrentDatabase();
        access.Quit();
        access = null;
    }
}
