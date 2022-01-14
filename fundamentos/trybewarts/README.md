# Projeto Trybewarts
*Este projeto foi desenvolvido em dupla com o aluno Omar Merljak e a estilização foi individual*

## Lista de requisitos obrigatórios:

### [](https://github.com/tryber/sd-015-a-project-trybewarts#1-crie-uma-barra-verde-na-parte-superior-da-p%C3%A1gina)1. Crie uma barra verde na parte superior da página

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-1)Observações técnicas:

-   Esta barra deve possuir a classe  `header`
-   A classe  `header`  deve determinar que o elemento é um  **flex container**
-   A classe  `header`  deve possuir a propriedade  `background-color: rgb(50, 167, 145)`

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado)O que será verificado:

-   Existe um elemento com a classe  `header`
-   O elemento possui a propriedade CSS  `display: flex`
-   O elemento possui a propriedade CSS  `background-color: rgb(50, 167, 145)`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#2-adicione-o-logotipo-da-trybewarts-com-a-classe-trybewarts-header-logo-na-barra-superior)2. Adicione o logotipo da Trybewarts com a classe  `trybewarts-header-logo`  na barra superior

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-2)Observações técnicas:

-   Deve existir um elemento img com a classe  `trybewarts-header-logo`
-   O atributo  `src`  do logotipo deve apontar para  `images/trybewarts-header-logo.svg`

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-1)O que será verificado:

-   Existe um elemento  `img`  com a classe  `trybewarts-header-logo`
-   O elemento possui o atributo  `src`  apontando para  `images/trybewarts-header-logo.svg`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#3-acrescente-um-formul%C3%A1rio-de-login-no-canto-direito-da-barra-superior-contendo-os-inputs-de-email-senha-e-um-bot%C3%A3o-de-login)3. Acrescente um formulário de login no canto direito da barra superior contendo os inputs de email, senha e um botão de login

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-3)Observações técnicas:

-   O formulário deve ter a classe  `trybewarts-login`
-   O input de  **email**  deverá ter o atributo  `name`  igual a  **email**  e o  `placeholder`  igual a  **Email**
-   O input de  **senha**  deverá ter o atributo  `name`  igual a  **password**  e o  `placeholder`  igual a  **Senha**
-   O botão deverá ter o texto  **"Entrar"**
-   O formulário deve ser um  **flex container**
-   O formulário deve estar a direita da logo
    -   **Dica:**  adicione a propriedade flex que faz os elementos terem o espaçamento máximo  **entre eles**  no  **header**
-   Ao preencher o formulário e clicar no botão, será validado que:
    -   Caso o email seja  **"[tryber@teste.com](mailto:tryber@teste.com)"**  e a senha seja  **"123456"**  será emitido um alerta contendo o texto  **"Olá, Tryber!"**
    -   Em todos os outro casos deverá ser emitido um alerta contendo o texto  **"Email ou senha inválidos."**

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-2)O que será verificado:

-   Existe um elemento  `form`  com a classe  `trybewarts-login`
-   Existe um input com o atributo  `name`  igual a  **email**  e o  `placeholder`  igual a  **Email**
-   Existe um input com o atributo  `name`  igual a  **password**  e o  `placeholder`  igual a  **Senha**
-   Existe um botão com o texto  **"Entrar"**
-   O formulário possui a propriedade CSS  `display: flex`
-   O elemento  `form`  está à direita da logo
-   Ao clicar no botão de login dispara um alert com o texto  **"Email ou senha inválidos"**, no caso de erro de preenchimento dos dados
-   Ao clicar no botão de login dispara um alert com o texto  **"Olá, Tryber!"**, no caso de preenchimento correto dos dados.

### [](https://github.com/tryber/sd-015-a-project-trybewarts#4-crie-um-t%C3%ADtulo-com-o-texto-trybewarts-centralizado-dentro-do-header)4. Crie um título com o texto  `Trybewarts`  centralizado dentro do  `Header`

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-4)Observações técnicas:

-   Deve existir um elemento  `<h1>`  com o  **id**  `trybewarts-header-title`  e com o texto  **"Trybewarts"**
-   O título deverá estar centralizado na barra verde
    -   O header deve ter exatamente três elementos filhos
    -   O filho do meio deve ser o título

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-3)O que será verificado:

-   Existe um elemento  `h1`  com o id  `trybewarts-header-title`  e com o texto  `Trybewarts`
-   O elemento com a classe  `header`  deve possuir exatos  `3`  elementos filhos
-   O filho do meio do elemento com a classe  `header`  deve ser o título h1  `Trybewarts`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#5-adicione-um-formul%C3%A1rio-no-corpo-da-p%C3%A1gina)5. Adicione um formulário no corpo da página

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-5)Observações técnicas:

-   Deve existir um formulário com o id  `evaluation-form`
-   O formulário deve estar inserido dentro de uma tag  `main`
-   Tanto o formulário quanto o  `main`  devem ser flex containers
-   O formulário deve ter uma largura de 675px

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-4)O que será verificado:

-   Existe um elemento  `form`  com o id  `evaluation-form`
-   O elemento  `form`  está dentro da tag  `main`
-   O elemento  `main`  e o  `form`  possuem a propriedade CSS  `display: flex`
-   O elemento  `form`  possui a propriedade CSS  `width: 675px`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#6-fa%C3%A7a-com-que-o-eixo-principal-do-formul%C3%A1rio-seja-vertical)6. Faça com que o eixo principal do formulário seja vertical

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-6)Observações técnicas:

-   Mude o eixo principal do formulário com id  `evaluation-form`  para vertical

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-5)O que será verificado:

-   O elemento  `evaluation-form`  possui a propriedade CSS  `flex-direction: column`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#7-adicione-a-logo-da-trybewarts-no-lado-direito-da-p%C3%A1gina)7. Adicione a logo da Trybewarts no lado direito da página

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-7)Observações técnicas:

-   Crie um elemento  `img`  com o id  `trybewarts-forms-logo`
-   O atributo  `src`  deve apontar para  `images/trybewarts-colored.svg`
-   A imagem deve possuir o estilo css  `height`  de  `500px`

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-6)O que será verificado:

-   Existe um elemento  `img`  com o id  `trybewarts-forms-logo`
-   O elemento possui o atributo  `src`  apontando para  `images/trybewarts-colored.svg`
-   A imagem possui o estilo css  `height`  igual a  `500px`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#8-acrescente-ao-formul%C3%A1rio-com-id-evaluation-form-os-inputs-de-nome-sobrenome-e-email)8. Acrescente ao formulário com id  `evaluation-form`  os inputs de  `nome, sobrenome e email`

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-8)Observações técnicas:

-   Deverá haver um input com o id  **input-name**  e placeholder  **Nome**
-   Deverá haver um input com o id  **input-lastname**  e placeholder  **Sobrenome**
-   Deverá haver um input com o id  **input-email**  e placeholder  **Email**

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-7)O que será verificado:

-   Existe um input com o id  **input-name**  e placeholder  **Nome**
-   Existe um input com o id  **input-lastname**  e placeholder  **Sobrenome**
-   Existe um input com o id  **input-email**  e placeholder  **Email**

### [](https://github.com/tryber/sd-015-a-project-trybewarts#9-acrescente-ao-formul%C3%A1rio-um-select-com-o-id-house-contendo-as-op%C3%A7%C3%B5es-gitn%C3%B3ria-reactpuff-corvinode-e-pytherina)9. Acrescente ao formulário um select com o id  `house`  contendo as opções  `Gitnória`,  `Reactpuff`,  `Corvinode`  e  `Pytherina`

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-9)Observações técnicas:

-   Deverá conter a opção com  `text`  e  `value`  igual a  `Gitnória`  e com o  `id`  igual a  `gitnoria-house`
-   Deverá conter a opção com  `text`  e  `value`  igual a  `Reactpuff`  e com o  `id`  igual a  `reactpuff-house`
-   Deverá conter a opção com  `text`  e  `value`  igual a  `Corvinode`  e com o  `id`  igual a  `corvinode-house`
-   Deverá conter a opção com  `text`  e  `value`  igual a  `Pytherina`  e com o  `id`  igual a  `pytherina-house`

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-8)O que será verificado:

-   Existe um elemento  `select`  com o id  `house`
-   Existe um elemento  `option`  com  `text`  e  `value`  igual a  `Gitnória`  e com o  `id`  igual a  `gitnoria-house`
-   Existe um elemento  `option`  com  `text`  e  `value`  igual a  `Reactpuff`  e com o  `id`  igual a  `reactpuff-house`
-   Existe um elemento  `option`  com  `text`  e  `value`  igual a  `Corvinode`  e com o  `id`  igual a  `corvinode-house`
-   Existe um elemento  `option`  com  `text`  e  `value`  igual a  `Pytherina`  e com o  `id`  igual a  `pytherina-house`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#10-posicione-os-campos-de-nome-e-sobrenome-para-que-fiquem-em-linha)10. Posicione os campos de  `Nome`  e  `Sobrenome`  para que fiquem em linha

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-10)Observações técnicas:

-   Os campos de  `Nome`  e  `Sobrenome`  devem estar lado a lado

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-9)O que será verificado:

-   O campo de  `Sobrenome`  está à direita do campo de  `Nome`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#11-posicione-os-campos-de-email-e-casa-para-que-fiquem-em-linha)11. Posicione os campos de  `Email`  e  `Casa`  para que fiquem em linha

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-11)Observações técnicas:

-   Os campos de  `Email`  e  `Casa`  devem estar lado a lado

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-10)O que será verificado:

-   O campo de  `Casa`  está à direita do campo de  `Email`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#12-acrescente-ao-formul%C3%A1rio-um-campo-de-entrada-para-qual-fam%C3%ADlia-a-pessoa-estudante-se-identifica)12. Acrescente ao formulário um campo de entrada para qual família a pessoa estudante se identifica

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-12)Observações técnicas:

-   Crie um elemento com o id  `label-family`  e o texto  **"Qual sua família?"**  deverá ser criado
-   Crie um  `input`  do tipo  `radio`  com o atributo  `name`  igual a  **family**  e  `value`  igual a  **Frontend**
-   Crie um  `input`  do tipo  `radio`  com o atributo  `name`  igual a  **family**  e  `value`  igual a  **Backend**
-   Crie um  `input`  do tipo  `radio`  com o atributo  `name`  igual a  **family**  e  `value`  igual a  **FullStack**
-   Posicione os radio buttons para ficar abaixo um do outro, na sequência  **Frontend**,  **Backend**  e  **Fullstack**
-   Posicione os radio buttons abaixo do label

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-11)O que será verificado:

-   Existe um elemento  `label`  com o  `id`  **label-family**  que possui o conteúdo de texto  `Qual sua família?`
-   Existe um  `input`  do tipo  `radio`  com o atributo  `name`  igual a  **family**  e  `value`  igual a  **Frontend**
-   Existe um  `input`  do tipo  `radio`  com o atributo  `name`  igual a  **family**  e  `value`  igual a  **Backend**
-   Existe um  `input`  do tipo  `radio`  com o atributo  `name`  igual a  **family**  e  `value`  igual a  **FullStack**
-   Os inputs do tipo  `radio`  estão um abaixo do outro na sequência  **Frontend**,  **Backend**  e  **Fullstack**
-   Os inputs do tipo  `radio`  estão abaixo do texto da label

### [](https://github.com/tryber/sd-015-a-project-trybewarts#13-crie-campos-de-entrada-do-tipo-checkbox-contendo-seis-op%C3%A7%C3%B5es)13. Crie campos de entrada do tipo  `checkbox`  contendo seis opções

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-13)Observações técnicas:

-   Crie um elemento com o  `id`  **label-content**  e o texto  **"Qual conteúdo você está com mais vontade de aprender?"**
-   Crie um input do tipo  `checkbox`  com o value igual a  **HoFs**
-   Crie um input do tipo  `checkbox`  com o value igual a  **Jest**
-   Crie um input do tipo  `checkbox`  com o value igual a  **Promises**
-   Crie um input do tipo  `checkbox`  com o value igual a  **React**
-   Crie um input do tipo  `checkbox`  com o value igual a  **SQL**
-   Crie um input do tipo  `checkbox`  com o value igual a  **Python**
-   Posicione as checkboxes abaixo do label

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-12)O que será verificado:

-   Existe um elemento  `label`  com o  `id`  **label-content**  que possui um conteúdo de texto  `Qual conteúdo você está com mais vontade de aprender?`
-   Existe um  `input`  do tipo  `checkbox`  com o atributo value igual a  **HoFs**
-   Existe um  `input`  do tipo  `checkbox`  com o atributo value igual a  **Jest**
-   Existe um  `input`  do tipo  `checkbox`  com o atributo value igual a  **Promises**
-   Existe um  `input`  do tipo  `checkbox`  com o atributo value igual a  **React**
-   Existe um  `input`  do tipo  `checkbox`  com o atributo value igual a  **SQL**
-   Existe um  `input`  do tipo  `checkbox`  com o atributo value igual a  **Python**
-   Os elementos  `checkbox`  então posicionados abaixo da label

### [](https://github.com/tryber/sd-015-a-project-trybewarts#14-crie-campo-de-entrada-para-avaliar-de-1-a-10-o-n%C3%ADvel-de-satisfa%C3%A7%C3%A3o-com-a-trybewarts)14. Crie campo de entrada para avaliar de 1 a 10 o nível de satisfação com a Trybewarts

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-14)Observações técnicas:

-   Um elemento com o  `id`  **label-rate**  e o texto  **"Como você avalia a Trybewarts?"**  deverá ser criado
-   O campo deve ser formado por dez radio buttons, contendo as opções de 1 a 10
-   Os radio buttons devem ter o atributo  `value`  com o valor de suas opções de 1 a 10.
-   Os radio buttons devem ter o atributo  `name`  com o valor  **"rate"**
-   Posicione os radio buttons para ficar lado a lado
-   Posicione os radio buttons à direita da label

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-13)O que será verificado:

-   Existe um elemento  `label`  com o  `id`  **label-rate**  que possui um conteúdo de texto  `Como você avalia a Trybewarts?`
-   Existem 10  `radio-buttons`  com o atributo  `name="rate"`
-   Existem 10  `radio-buttons`  contendo o atributo  `value`  de 1 a 10
-   Os  `radio-buttons`  estão à direita do texto da label

### [](https://github.com/tryber/sd-015-a-project-trybewarts#15-crie-uma-textarea-com-o-id-textarea-e-uma-label-com-a-classe-textarea-contendo-o-n%C3%BAmero-m%C3%A1ximo-de-caracteres-igual-%C3%A0-500)15. Crie uma textarea com o id  `textarea`  e uma label com a classe  `textarea`  contendo o número máximo de caracteres igual à 500

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-15)Observações técnicas:

-   Uma label com a classe  `textarea`  e o texto  **"Deixe seu comentário:"**  deverá ser criado
-   O campo  `textarea`  deverá ter o máximo de 500 caracteres

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-14)O que será verificado:

-   Existe uma  `label`  com a classe  `textarea`  e o texto  `Deixe seu comentário:`
-   O elemento  `textarea`  possui um limite de 500 caracteres

### [](https://github.com/tryber/sd-015-a-project-trybewarts#16-crie-um-campo-de-entrada-do-tipo-checkbox-com-o-id-agreement-para-validar-as-informa%C3%A7%C3%B5es)16. Crie um campo de entrada do tipo  `checkbox`  com o id  `agreement`  para validar as informações

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-16)Observações técnicas:

-   Um rótulo (label) com o id  `label-infos`  e o texto  **"Você concorda com o uso das informações acima?"**  deverá ser criado
-   O campo deve ser formado por um checkbox
-   O campo de 'checkbox' deve possuir o ID  `agreement`
-   Posicione a checkbox ao lado da label

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-15)O que será verificado:

-   Existe uma label com o id  `label-infos`  que possui o texto  `Você concorda com o uso das informações acima?`
-   Existe um input do tipo  `checkbox`  com o id  `agreement`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#17-crie-um-bot%C3%A3o-de-enviar-para-submeter-o-formul%C3%A1rio)17. Crie um botão de Enviar para submeter o formulário

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-17)Observações técnicas:

-   Um botão do tipo  `submit`  deverá ser criado
-   O botão deve possuir o ID  `submit-btn`
-   Deverá conter o texto  **"Enviar"**

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-16)O que será verificado:

-   Existe um botão do tipo  `submit`  com o id  `submit-btn`  e o texto  `Enviar`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#18-fa%C3%A7a-com-que-o-bot%C3%A3o-enviar-seja-habilitado-somente-ap%C3%B3s-a-checkbox-do-requisito-16-ser-selecionada)18. Faça com que o botão  `Enviar`  seja habilitado somente após a checkbox do requisito 16 ser selecionada

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-18)Observações técnicas:

-   O botão deverá estar desabilitado caso a checkbox não esteja selecionada
-   O botão deverá ser habilitado caso a checkbox seja selecionada

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-17)O que será verificado:

-   O botão está inicialmente desabilitado
-   O botão torna-se habilitado, ao marcar o campo com id  `agreement`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#19-crie-um-rodap%C3%A9-no-final-da-p%C3%A1gina)19. Crie um rodapé no final da página

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-19)Observações técnicas:

-   O rodapé deverá conter o texto  **"Direitos reservados à Trybewarts©"**

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-18)O que será verificado:

-   Existe um elemento  `footer`  deve possuir o texto  `Direitos reservados à Trybewarts©`

## [](https://github.com/tryber/sd-015-a-project-trybewarts#lista-de-requisitos-b%C3%B4nus)Lista de requisitos bônus:

### [](https://github.com/tryber/sd-015-a-project-trybewarts#20-crie-um-contador-com-o-id-counter-contendo-o-n%C3%BAmero-de-caracteres-dispon%C3%ADveis-no-textarea-variando-de-500-at%C3%A9-0-que-dever%C3%A1-ser-atualizado-a-medida-que-algo-for-digitado-na-textarea)20. Crie um contador com o ID  `counter`  contendo o número de caracteres disponíveis no textarea, variando de 500 até 0, que deverá ser atualizado a medida que algo for digitado na textarea

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-20)Observações técnicas:

-   O contador deverá possuir o ID  `counter`
-   O contador inicialmente deve possuir o valor  `500`
-   O contador deverá decrementar a medida que algo for escrito no campo  `textarea`
-   O contador deverá incrementar a medida que algo for deletado no campo  `textarea`
-   O elemento  `textarea`  deverá possuir  `id="textarea"`

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-19)O que será verificado:

-   Existe um elemento com o id  `counter`
-   Existe um elemento com o id  `textarea`
-   O preenchimento do campo de  `textarea`  altera o número apresentado no elemento  `#counter`

### [](https://github.com/tryber/sd-015-a-project-trybewarts#21-fa%C3%A7a-com-que-ao-clicar-no-bot%C3%A3o-enviar-o-conte%C3%BAdo-do-formul%C3%A1rio-seja-substitu%C3%ADdo-pelas-informa%C3%A7%C3%B5es-preenchidas)21. Faça com que ao clicar no botão  `Enviar`, o conteúdo do formulário seja substituído pelas informações preenchidas

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#observa%C3%A7%C3%B5es-t%C3%A9cnicas-21)Observações técnicas:

-   Todos os campos do formulário devem ser substituídos.
-   Deve haver um campo com o formato "Nome: Alguem Aqui"
-   Deve haver um campo com o formato "Email:  [email@mail.com](mailto:email@mail.com)"
-   Deve haver um campo com o formato "Casa: Casa Escolhida"
-   Deve haver um campo com o formato "Família: Família Escolhida"
-   Deve haver um campo com o formato "Matérias: Matérias, Marcadas, Aqui"
-   Deve haver um campo com o formato "Avaliação: NotaAqui"
-   Deve haver um campo com o formato "Observações: Observações aqui"

#### [](https://github.com/tryber/sd-015-a-project-trybewarts#o-que-ser%C3%A1-verificado-20)O que será verificado:

-   Os  `inputs`  tipo  `checkbox`  referentes à lista de conteúdo possuem  `class="subject"`
-   Ao clicar no botão de enviar, existe um texto no formato  `Nome: -Nome- -Sobrenome-`
-   Ao clicar no botão de enviar, existe um texto no formato  `Email: -Email-`
-   Ao clicar no botão de enviar, existe um texto no formato  `Casa: -Casa-`
-   Ao clicar no botão de enviar, existe um texto no formato  `Família: -Família-`
-   Ao clicar no botão de enviar, existe um texto no formato  `Matérias: -Matérias Selecionadas-`
-   Ao clicar no botão de enviar, existe um texto no formato  `Avaliação: -Avaliação-`
-   Ao clicar no botão de enviar, existe um texto no formato  `Observações: -Observações-`

