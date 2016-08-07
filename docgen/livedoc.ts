namespace LiveDoc {

    function getAllCodes() {
        return document.body.querySelectorAll('code');
    }

    export function evalLastCode() {
        var allCodes = getAllCodes();
        var code = allCodes.item(allCodes.length - 1) as HTMLElement;

        document.write('<div id="' + codeOutputId(allCodes.length - 1) + '">')
        document.write('<p>Example output:</p>')

        eval(code.innerText);

        document.write('</div>')
    }

    function codeOutputId(i: number) {
        return 'code-output-' + i;
    }

    export function tryIt(codeIndex: number) {
        var allCodes = getAllCodes();
        var code = allCodes.item(codeIndex) as HTMLElement;
        var codeText = code.innerText;
        var pre = code.parentElement;
        var button = pre.querySelector('button.livedoc-play') as HTMLElement;

        if (button.classList.contains('wait')) return;
        button.classList.add('wait');

        var iframe = document.createElement('iframe');
        iframe.className = 'trynow';
        iframe.src = 'https://microsoft.github.io/maker.js/playground/embed.html?parentload=getcode';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.style.display = 'none';

        pre.parentElement.appendChild(iframe);

        window['getcode'] = function () {

            pre.style.display = 'none';
            button.style.display = 'none';

            var svg = document.getElementById(codeOutputId(codeIndex));
            if (svg) {
                svg.style.display = 'none';
            }

            iframe.style.display = '';

            return code.innerText;
        };

    }

    window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false); //remove listener, no longer needed

        var allCodes = getAllCodes();

        for (var i = 0; i < allCodes.length; i++) {
            //add a button

            var code = allCodes.item(i) as HTMLElement;
            var codeText = code.innerText;
            var keywordPos = codeText.toLowerCase().indexOf('render');
            //if (!(keywordPos === 2 || keywordPos === 3)) continue;

            var pre = code.parentElement;

            var button = '<button class="livedoc-play" onclick="LiveDoc.tryIt(' + i + ')" style="display:none" >play</button>';
            pre.insertAdjacentHTML('beforebegin', button);
        }



    }, false);
}