(function () {
  function Program() {

    return this;
  }

  Program.prototype.createLine = createLine;

  function guessWhatsNext(){

  }

  function createLine() {
    var colunas = 3;
    var i = 0;
    var previous = [[1,0,1]];
    var result = [];
    var iResult;

    /*
      Quando estou no 1
      Pego o 0, e comparo com o 1
      O resultado é o 2

      Sei la o que é isso
      +++
      +-+
      -+?
      +++

      Alguns padrões (já que estou com paciência)

      A inverção do primeiro valor da linha acima
      -+--+--+--+--+--+
      +--+--+--+--+--+-
      --+--+--+--+--+--
      +--+--+--+--+--+-
      --+--+--+--+--+--
      +--+--+--+--+--+-

      -+-
      +--
      --+
      +--
      --+

      -+
      +-

      O espelho da linha acima
      -+--+--+--+--+--+
      +-++-++-++-++-++-
      -+--+--+--+--+--+
      +-++-++-++-++-++-
      -+--+--+--+--+--+
      +-++-++-++-++-++-
      -+--+--+--+--+--+
      +-++-++-++-++-++-

      Triangulo?
      -+--+--+--+--+--+-
       --+--+--+--+--+--
        +--+--+--+--+--+
         -+--+--+--+--+-
          --+--+--+--+--
           +--+--+--+--+
            -+--+--+--+-
             --+--+--+--
              +--+--+--+
               -+--+--+-
                --+--+--
                 +--+--+
                  -+--+-
                   --+--
                    --+-
                     +--
                      -+
                       -
                      -+
                     --+
                    ????
                   ?????
                  ??????
                 ???????
                ????????
               ?????????
              ??????????
             ???????????
            ????????????
           ?????????????
          ??????????????
         ???????????????
        ????????????????
       ?????????????????
      ??????????????????
    */

    for (i; i < colunas; i++) {
      iResult = !!result[i - 1] === !!result[i];

      result.push(iResult);
    };

    console.log(result);

    debugger
  }

  window.Program = Program;
}())

var run = new Program();

run.createLine();
