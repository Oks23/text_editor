          function getE(a) {
              return document.getElementsByClassName(a)[0];
          }
          let df = document.forms;

          /*кнопка редагування головного вікна*/
          df.control.Editbtn.addEventListener('click', function () {
              df.editform.txt.innerHTML = getE('window').innerHTML;
              df.editform.style.display = 'block';
              getE('stylebox').style.display = 'none';
          });

          /*зберігаємо зміни в текcті*/
          df.editform.savebtn.addEventListener('click', function () {
              getE('window').innerHTML = df.editform.txt.value;
              df.editform.style.display = 'none';
          });

          /*скасовуємо*/
          df.editform.rstbtn.addEventListener('click', function () {
              df.editform.style.display = 'none';
          });
          /*додаємо текст до існуючого*/
          df.editform.addbtn.addEventListener('click', function () {
              getE('window').innerHTML += df.editform.txt.value; //
          });


          /*поява стилізаційної форми*/
          df.control.Stylebtn.addEventListener('click', function () {
              getE('stylebox').style.display = 'block';
          });


          /*розмір тексту*/
          for (let i = 0; i < df.textsize.length; i++) {
              df.textsize.elements[i].addEventListener('click', function () {
                  getE('window').style.fontSize = this.value;
              })
          };

          /*тип шрифту*/
          for (let i = 0; i < df.texttype.length; i++) {
              df.texttype.elements[i].addEventListener('click', function () {
                  getE('window').style.fontFamily = this.value;
              });
          };

          let colorboxlist = document.querySelectorAll('.colorboxlist');
          let bgcolorlist = document.querySelectorAll('.bgcolorlist');

          /*таблиця кольорів для фону */
          df.color.bgcolor.addEventListener('click', function () {
              document.getElementById('colorboxbg').style.display = 'table';
              document.getElementById('colorbox').style.display = 'none';
              for (let i = 0; i < bgcolorlist.length; i++) {
                  bgcolorlist[i].addEventListener('click', function () {
                      getE('window').style.background = this.style.background;
                  })
              }
          });

          /*таблиця кольорів для тексту */
          df.color.txtcolor.addEventListener('click', function () {
              document.getElementById('colorbox').style.display = 'table';
              document.getElementById('colorboxbg').style.display = 'none';
              for (let i = 0; i < colorboxlist.length; i++) {
                  colorboxlist[i].addEventListener('click', function () {
                      getE('window').style.color = this.style.color;
                  })
              }
          });

          /*кнопка закриття табл.*/
          df.color.closesb.addEventListener('click', function () {
              document.getElementById('colorbox').style.display = 'none';
              document.getElementById('colorboxbg').style.display = 'none';
              getE('window').style.background = '';
              getE('window').style.color = '';
          });

          /*жирність тексту*/
          df.bolder.boldtxt.addEventListener('click', function () {
              if (this.checked) {
                  getE('window').style.fontWeight = 'bold';
              } else {
                  getE('window').style.fontWeight = 'normal';
              }
          });

          /*курсивність тексту*/
          df.bolder.italictxt.addEventListener('click', function () {
              if (this.checked) {
                  getE('window').style.fontStyle = 'italic';
              } else {
                  getE('window').style.fontStyle = 'normal';
              }
          });

          /*зникає головна панель /з'являэться форма для створення таблиці/списку*/
          df.editform.addproperbtn.addEventListener('click', function () {
              getE('main').style.display = 'none';
              getE('addtable').style.display = 'block';
          });

          /*форма створення таблиці*/
          let inputs = document.getElementsByTagName('input');
          let permission;

          function validate(input) {
              if (input.type == 'text') {
                  if (input.value == '' || input.value != input.value * 1 || input.value >= 1000 || input.value <= 0) {
                      input.style.border = '1.5px solid red';
                      input.style.borderColor = 'red';
                      input.nextElementSibling.style.display = 'inLine';
                      permission = false;
                  } else {
                      input.style.border = '1.5px solid green';
                      input.style.borderColor = 'green';
                      input.nextElementSibling.style.display = 'none';
                      permission = true;
                  }
              }
          }

          for (let i = 0; i < inputs.length; i++) {
              inputs[i].addEventListener('input', function () {
                  validate(this);
              });
          }

          df.submit.tablebtn.addEventListener('click', function () {
              if (permission) {
                  let rows = df.chsnumberline.nmbrrows.value;
                  let col = df.chsnumberline.nmbrcolumn.value;
                  let widthcell = df.sizecell.widthcell.value;
                  let heightcell = df.sizecell.heightcell.value;
                  let sizeline = df.stylizeline.sizeline.value;
                  let linetype = df.stylizeline.linetype.value;
                  let colortp = df.stylizeline.colortp.value;
                  let tablewindow = '<table style="border:' + sizeline + 'px ' + linetype + ' ' + colortp + ';">';

                  for (i = 0; i < rows; i++) {
                      tablewindow += '<tr>';
                      for (j = 0; j < col; j++) {
                          tablewindow += '<td style="width:' + widthcell + 'px; height:' + heightcell + 'px;' + 'border:' + sizeline + 'px ' + linetype + ' ' + colortp + ';"></td>';
                      }
                      tablewindow += '</tr>';
                  }
                  tablewindow += '</table>';
                  df.editform.txt.value += tablewindow;

                  getE('addtable').style.display = 'none';
                  getE('main').style.display = 'block';
              } else {
                  alert('Введіть коректні дані')
              }
          });

          /*зникає форма для створення табл./з'являєтся форма списку*/
          document.getElementById('table').onclick = function () {
              getE('listoption').style.display = 'none';
              getE('optiontable').style.display = 'block';
          }
          document.getElementById('list').onclick = function () {
              getE('listoption').style.display = 'block';
              getE('optiontable').style.display = 'none';
          }


          /*форма створення списку */
          df.listbtn.listbtnsub.addEventListener('click', function () {
              let list = ('<li>text</li>');
              let texttype = df.typelist.chstypelist.value;
              let nmbrlist = df.listitems.numerosity.value;
              let listwindow = '<ul type="' + texttype + '">';
              for (let i = 0; i < nmbrlist; i++) {
                  listwindow += list;
              }
              listwindow += '</ul>';
              df.editform.txt.value += listwindow;

              getE('addtable').style.display = 'none';
              getE('main').style.display = 'block';
          });
