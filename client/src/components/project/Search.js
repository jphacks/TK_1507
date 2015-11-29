var React = require('react')

// Ui
var SearchForm = require('../ui/SearchForm.js')

var Search = React.createClass({
  componentDidMount: function() {

    var branches = [];
    var seed = {i: 0, x: 512, y: 380, a: 0, l: 160, d:0}; // a = angle, l = length, d = depth
    var da = 0.8; // Angle delta
    var dl = 0.94; // Length delta (factor)
    var ar = 0.8; // Randomness
    var maxDepth = 8;

    // Tree creation functions
    function branch(b) {
    	var end = endPt(b), daR, newB;

    	branches.push(b);

    	if (b.d === maxDepth)
    		return;

    	// Left branch
    	daR = ar * Math.random() - ar * 0.5;
    	newB = {
    		i: branches.length,
    		x: end.x,
    		y: end.y,
    		a: b.a - da + daR,
    		l: b.l * dl,
    		d: b.d + 1,
    		parent: b.i
    	};
    	branch(newB);

    	// Right branch
    	daR = ar * Math.random() - ar * 0.5;
    	newB = {
    		i: branches.length,
    		x: end.x,
    		y: end.y,
    		a: b.a + da + daR,
    		l: b.l * dl,
    		d: b.d + 1,
    		parent: b.i
    	};
    	branch(newB);
    }

    function regenerate(initialise) {
    	branches = [];
    	branch(seed);
    	initialise ? create() : update();
    }

    function endPt(b) {
    	// Return endpoint of branch
    	var x = b.x + b.l * Math.sin( b.a );
    	var y = b.y - b.l * Math.cos( b.a );
    	return {x: x, y: y};
    }

    // D3 functions
    function x1(d) {return d.x;}
    function y1(d) {return d.y;}
    function x2(d) {return endPt(d).x;}
    function y2(d) {return endPt(d).y;}

    function create() {
    	d3.select('svg')
    		.selectAll('line')
    		.data(branches)
    		.enter()
    		.append('line')
    		.attr('x1', x1)
    		.attr('y1', y1)
    		.attr('x2', x2)
    		.attr('y2', y2)
    		.style('stroke-width', function(d) {return parseInt(maxDepth + 1 - d.d) + 'px';})
    }

    function update() {
    	d3.select('svg')
    		.selectAll('line')
    		.data(branches)
    		.transition()
    		.attr('x1', x1)
    		.attr('y1', y1)
    		.attr('x2', x2)
    		.attr('y2', y2);
    }

    regenerate(true);

  },
  render: function() {
    return (
      <div>
        <div className='row'>
          <svg></svg>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-6 col-sm-offset-3'>
                <div className='row search-form-container'>
                  <div className='card'>
                    <div className='card-block'>
                      <SearchForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='row'>
          <div className='container'>
            <h2>Knowlect</h2>
            <hr />
            <p>
              社会ネットワーク分析には、「六次の隔たり」という用語が存在します．
              これは，世界中の人々をノードとし，人々の知り合い関係をエッジとした知り合い関係グラフにおいて，任意のノードから任意のノードに対して6ステップ以内で移動可能であるとする仮説です。
              ミルグラムのスモールワルド実験 1)によって検証が行われました．
              他にもスモールワールド現象についての研究は数多く行われています．
            </p>
            <p>
              Wikipediaは，ユーザによって編集されるWeb上で閲覧できる百科事典です． それぞれの項目では，関連する単語や事柄についてハイパーテキストリンクが張られています． Wikipediaにおける項目と項目間のリンク構造は，一種のグラフと捉えることができます．
            </p>
            <p>
              本アプリケーションでは，一つの巨大な知識のネットワークであるWikipediaについて，単語や事柄同士の「関係性」を明らかにし，「つながり」を可視化します．
            </p>
            <h2>特徴</h2>
            <hr />
            <h3>1.単語と単語を「繋げる」</h3>
            <p>
              単語と単語を繋げます．
              単語には一般的な名詞，固有名詞であればどんな言葉同士(1)でも繋がります．
              例えば「JavaScript」と「サボテン」，もしもこの2つに関係性があるのなら，一体どんな言葉で繋がるのか興味はありませんか? そのような知的興味や発見を促進させます.
            </p>
            <h3>2.「繋がり」を可視化する</h3>
            <p>
              この「繋がり」はグラフを用いて可視化されます．もし様々な繋がり方があるのならば，それらを比較したくはありませんか? 研究のサーベイや関連語句の手がかりとしてもこのアプリケーションは活用できます．
            </p>
            <h3>3. 「繋がり」を支持する．</h3>
            <p>単語同士に優秀な繋がり，意外な繋がりを発見した時，それをボタンひとつで支持することが出来ます．</p>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Search
