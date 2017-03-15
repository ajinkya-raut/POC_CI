public class Welcome {
    public string userName{get;set;}
    public Welcome(ApexPages.StandardController controller)
    {
        userName = userInfo.getFirstName() + ' ' + userInfo.getLastName();
    }
}