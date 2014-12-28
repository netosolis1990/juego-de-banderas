$(document).ready(function() {
    //Verificamos que el puntaje este inicializado
    if(!localStorage['ok']){
        localStorage['ok'] = 0;
        localStorage['mal'] = 0;
        $('#ok').val(localStorage['ok']);
        $('#mal').val(localStorage['mal']);
    }
    else{
        $('#ok').val(localStorage['ok']);
        $('#mal').val(localStorage['mal']);
    }

    //Cargamos el nombre de las banderas
    banderas = ['argentina',
        'australia',
        'belgica',
        'bolivia',
        'boznia-herzegovina',
        'colombia',
        'corea del sur',
        'costa de marfil',
        'españa',
        'ganha',
        'holanda',
        'inglaterra',
        'italia',
        'kuwait',
        'madagascar',
        'mexico',
        'peru',
        'rusia',
        'turkemenistan',
        'uruguay'];
    var tresb = new Array();
    var buena;


    //Generarmos 3 banderas diferentes al azar
    for (var i = 0; i < 3; i++) {
        var j;
        while(true){
            var esta = false;
            j = Math.round(Math.random()*19);
            for (var k = 0; k < i; k++) {
                if(tresb[k] == j){
                    esta = true;
                }   
            }
            if(!esta){
                tresb[i] = j;
                break;
            }
        }
        var src = 'banderas/'+banderas[j]+'.png';
        $('#ban'+(i+1)).html('<img class="img-responsive bandera" src="'+src+'">');
    };

    //Seleccionamos una bandera de las 3 anteriores
    buena = banderas[tresb[Math.round(Math.random()*2)]];
    $('#pais').html(buena.toUpperCase())


    //Al hacer click en una bandera verificamos si corresponde al pais que se pregunta
    $('.bandera').click(function(event) {
        var tem = this.src;
        if(tem.indexOf(buena)>-1){
            nota('success','<strong>BUENAAAAA</strong>');
            localStorage['ok']++;
            setTimeout(function(){location.href = 'index.html'},2000);
        }
        else{
            nota('error','BUUUU NO SABES!');
            localStorage['mal']++;
            setTimeout(function(){location.href = 'index.html'},2000);
        }
        $('.bandera').hide();
        
    });

    //Cuando se hace click en REINICIAR se pone a 0 el marcador
    $('#reset').click(function(event) {
        if(confirm('Quieres empezar de nuevo?')){
             localStorage['ok'] = 0;
             localStorage['mal'] = 0;
             location.href = 'index.html';
        }
        return;
    });
}); 


function nota(op,msg,time){
    if(time == undefined)time = 5000;
    var n = noty({
        text: msg,
        animation: {
            open: {height: 'toggle'}, 
            close: {height: 'toggle'},
            easing: 'swing', 
            speed: 500,
        },
        type:op,
        killer:true,
        timeout:time,
        layout: 'center',
        maxVisible: 1,
    });
}