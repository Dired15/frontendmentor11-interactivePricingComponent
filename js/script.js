

function RateDisplay()
{
    this.numberOfPageview=document.getElementById("numberOfPageview");
    this.price=document.querySelector("#rate em");
    this.numberOfView=0;
    this.pricePerView=16/100000;
    this.pricePerMonth;
    this.monthly=true;

    this.display=function(){

        
      
        var dispNumberOfView=0;
        

        
        

        if(this.numberOfView>=1000)
        {
            dispNumberOfView=this.numberOfView/1000;
            dispNumberOfView=parseInt(dispNumberOfView);
            
            dispNumberOfView+="K PAGEVIEWS";

        }
        else
        {
            dispNumberOfView=parseInt(this.numberOfView);
            dispNumberOfView+=" PAGEVIEWS";

        }

        this.numberOfPageview.innerHTML=dispNumberOfView;

        if(this.monthly)
        {
            this.price.innerHTML="$"+this.pricePerMonth;
            this.price.nextSibling.data=" / month";
        }
        else
        {
            this.price.innerHTML="$"+(this.pricePerMonth);
            this.price.nextSibling.data=" / year";
        }
        

        
    }

    this.setPrice=function(value){



        this.numberOfView=value;
        this.pricePerMonth=this.numberOfView*this.pricePerView;
        
        
            if(!this.monthly)
            {
                this.pricePerMonth*=12;
            }
            
            

        this.pricePerMonth=this.pricePerMonth.toPrecision(4);

       
        this.display();

    }

    this.setBilling=function(state){
        
        this.monthly=state;
       
            this.setPrice(this.numberOfView);

        
       
        


        
    }



}







function Cursor()
{
    this.pricingOption=document.getElementById("pricingOption");
    this.cursor=document.getElementById("cursorIcon");
    this.progressionBar=document.getElementById("progressionBar");
    this.progression=document.getElementById("progression");
    this.progressionBarWidth=this.progressionBar.offsetWidth-this.cursor.offsetWidth;
    this.pogressionBarPosition=getComputedStyle(this.progressionBar).left;
    this.progressionWidth=0;
    this.viewNumber=0;
    this.move=false;;
    this.lastX=getComputedStyle(this.cursor).left;

    

    this.pricingOption.addEventListener("mousemove",function(e){cursor.moveCursor(e.clientX);});
    
    this.cursor.addEventListener("mousedown",function(){cursor.setMove(true);});
    document.addEventListener("mouseup",function(){cursor.setMove(false);});

    this.moveCursor=function(X){
        if(this.move)
        {
            var deplacement=X-this.lastX;

               

           if((this.progressionWidth+deplacement)<=this.progressionBarWidth && (this.progressionWidth+deplacement)>=0)
            {
            
                this.setCursorPosition(deplacement);
                this.fillProgression(deplacement);
            }



            this.lastX=X;



        }
    }

    this.setCursorPosition=function(value){

        var position=getComputedStyle(this.cursor).left;
        position=position.slice(0,position.indexOf("p"));
        position=parseInt(position);
        
        var newPosition=position+value;
        
        
        
        this.cursor.style.left=newPosition+"px";
         
        
    }

    this.fillProgression=function(deplacement){

        
        var width=this.progression.offsetWidth;
        var newWidth=width+deplacement;

        this.progression.style.width=newWidth+"px";
        this.progressionWidth=this.progression.offsetWidth;
        this.setViewNumber(newWidth);

    }

    this.setViewNumber=function(width){

        this.viewNumber=(width/this.progressionBarWidth)*200000;
        rateDisplay.setPrice(this.viewNumber);



    }

    this.setMove=function(value)
    {
        this.move=value;
        if(!this.move)
        {
            this.lastX=getComputedStyle(this.cursor).left;
        }
    }





}

function BillingButton()
{
    this.optionBilling=document.querySelectorAll("#switchBillingButton div");
    this.switchSelected=0;


    this.optionBilling[0].addEventListener("click",function(e){billingButton.switchBilling(e.target);});
    this.optionBilling[1].addEventListener("click",function(e){billingButton.switchBilling(e.target);});

    this.switchBilling=function(target){

        if(this.optionBilling[0]==target)
        {
            this.addSelected(0);
            this.removeSelected(1);
            rateDisplay.setBilling(true);

        }
        else
        {
            this.addSelected(1);
            this.removeSelected(0);
            rateDisplay.setBilling(false);
            
        }

        
        
    }

    this.addSelected=function(index){

        this.optionBilling[index].className="billingSelected";
    }

    this.removeSelected=function(index){

        this.optionBilling[index].className="";
    }




}

var cursor=new Cursor();
var billingButton=new BillingButton();
var rateDisplay=new RateDisplay;








