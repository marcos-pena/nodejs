const http = require('http');
const formidable = require('formidable');

http.createServer( function(req, res){

    //montar formulário
    res.writeHead(200, {'Content-Type' : 'text/html;charset=UTF-8'});
    res.write('<h1>Cálculo de Taxa Metabólica Basal (TMB)</h1>');
    res.write('<form action="" method="post" enctype="multipart/form-data">');
    res.write('Sexo<br>');
    res.write('<input type="radio" id="masculino" name="genero" value="m" checked>');
    res.write('<label for="masculino">Masculino</label>');
    res.write('<input type="radio" id="feminino" name="genero" value="f">');
    res.write('<label for="feminino">Feminino</label><br>');
    res.write('Peso<br>');
    res.write('<input type="text" name="peso"><br>');
    res.write('Altura (cm)<br>');
    res.write('<input type="text" name="altura"><br>');
    res.write('Idade<br>');
    res.write('<input type="text" name="idade"><br>');
    res.write('<input type="submit">');
    res.write('</form>');

    /*verificar se há envio de dados no formulário, se 
    houver tratá-los, senão apenas montar formulário 
    para preenchimento */
    if(req.method == 'POST'){
        
        const form = formidable();
        
        form.parse(req, (err, fields, files) => {
            
            //validar preenchimento de campos
            if(fields.peso > 0 && fields.altura > 0 && fields.idade >0){
                //Calcular TMB com os dados informados
                var tmb;

                if(fields.genero == 'm'){
                    tmb = 66 + (13.7 * fields.peso) + (5 * fields.altura) - (6.8 * fields.idade)
                }else{
                    tmb = 655 + (9.6 * fields.peso) + (1.8 * fields.altura) - (4.7 * fields.idade);
                }

                res.write('Sua TMB: ' + tmb );
            }else{
                res.write('Favor preencher todos os campos com valores válidos!');
            }
            
            res.end();
        });
    }
    else{
        res.end();
    }
       
}).listen(8000);