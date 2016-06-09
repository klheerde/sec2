/**
 * Created by kenva on 09/06/2016.
 */

(function(Aes)
{
    var button = document.getElementById('submit');
    if (button) button.onclick = function()
    {
        var name = document.getElementById('name');
        var text = document.getElementById('text');
        var pass = document.getElementById('pass');

        if (!name || !text || !pass)
            return alert('not all elements found');

        name = name.value;
        text = text.value;
        pass = pass.value;

        if (name == '' || text == '' || pass == '')
            return alert('not all values entered');

        window.localStorage.setItem(name, Aes.Ctr.encrypt(text, pass, 256));
        updatePhrases();
    };

    var reset = document.getElementById('reset');
    if (reset) reset.onclick = updatePhrases;

    function decrypt(e)
    {
        var tr = e.target.parentElement.parentElement;
        var pass = tr.querySelector('input');
        var para = tr.querySelector('.text');
        if (!pass || !para)
            return;
        para.innerText = Aes.Ctr.decrypt(para.innerText, pass.value, 256);
    }

    function updatePhrases()
    {
        var phrases = document.getElementById('phrases');
        if (!phrases)
            return;

        phrases.innerHTML =
        '<tr>' +
            '<th>Name</th>' +
            '<th>Text</th>' +
            '<th>Password</th>' +
            '<th>Descrypt</th>' +
        '</tr>';
        for (var i = 0, len = localStorage.length; i < len; ++i)
        {
            var name = localStorage.key(i);
            var text = localStorage.getItem(name);
            phrases.innerHTML +=
            '<tr class="decrypt">' +
                '<td>'+name+'</td>' +
                '<td class="text">'+text+'</td>' +
                '<td><input type="text"/></td>' +
                '<td><button>Decrypt</button></td>' +
            '</tr>';
        }

        var trs = document.getElementsByClassName('decrypt');
        for (var dI = 0, dLen = trs.length; dI < dLen; dI++)
            trs[dI].querySelector('button').onclick = decrypt;
    }

    updatePhrases();

})(window.Aes);