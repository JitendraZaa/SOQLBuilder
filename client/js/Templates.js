$("#createMenu").on("click","a",function(e){ 
    $ele = $(e.target);
    console.log('Clicked');
    console.log($ele.attr('compType'));
    
    var tDate = new Date();
    
      day = tDate.getDate();
      month = tDate.getMonth()+1;
      year = tDate.getFullYear();
    
     tDate =  day+'-'+month+ '-'+year ;
    
    if($ele.attr('compType') == 'ApexClass')
    {
        $("#codeBody").text(apexTemplate.replace('<USERNAME_PH>',$("#loggedInUser").text()).replace('<Date_PH>', tDate ));  
    }else if($ele.attr('compType') == 'ApexTrigger')
    {
        $("#codeBody").text(triggerTemplate.replace('<USERNAME_PH>',$("#loggedInUser").text()).replace('<Date_PH>', tDate ));  
    }else if($ele.attr('compType') == 'ApexPage')
    {
        $("#codeBody").text(vfPage.replace('<USERNAME_PH>',$("#loggedInUser").text()).replace('<Date_PH>', tDate ));  
    }else if($ele.attr('compType') == 'ApexComponent')
    {
        $("#codeBody").text(vfComponent.replace('<USERNAME_PH>',$("#loggedInUser").text()).replace('<Date_PH>', tDate ));  
    }
});

var apexTemplate = '/**\n'+
                    '*	@Author      :	<USERNAME_PH>\n'+
                    '*	@Description :	TO DO : This Apex class is Created Using Online Salesforce Editor (OSE)\n'+
                    '*	@Date        :	<Date_PH> \n'+
                    '**/\n'+
                    'public class <ClassNAME>{\n'+
                    '}\n';

var triggerTemplate =   '/**\n'+
                        '*	@Author      :	<USERNAME_PH>\n'+
                        '*	@Description :	TO DO : This Trigger is Created Using Online Salesforce Editor (OSE)\n'+
                        '*	@Date        :	<Date_PH> \n'+
                        '**/\n'+
                        'trigger <TRIGGER_NAME> on <OBJECT_API_NAME> (before insert, before update, after insert, after update, before delete, after delete, after undelete) {\n'+
                        '}\n';
 
var vfPage = '<!--\n'+
                '@Author		: <USERNAME_PH>\n'+
                '@Description	: TO DO : This Page is Created Using Online Salesforce Editor (OSE) \n'+
                '@Date		:  <Date_PH> \n'+
                '-->\n'+
                '<apex:page>\n'+
                  '<!-- Begin Default Content REMOVE THIS -->\n'+
                  '<h1>Congratulations</h1>\n'+
                  'This is your new Page\n'+
                  '<!-- End Default Content REMOVE THIS -->\n'+
            '</apex:page>';

var vfComponent = '<!--\n'+
                '@Author		: <USERNAME_PH>\n'+
                '@Description	: TO DO : This Component is Created Using Online Salesforce Editor (OSE) \n'+
                '@Date		:  <Date_PH> \n'+
                '-->\n'+
                '<apex:component>\n'+
                  '<apex:attribute name="myattribute" type="String" description="TODO: Describe me"/>\n'+
                  '<!-- Begin Default Content REMOVE THIS -->\n'+
                  '<h1>Congratulations</h1>\n'+
                  'This is your new Component: mynewcomponent\n'+
                  '<!-- End Default Content REMOVE THIS -->\n'+
                '</apex:component>';