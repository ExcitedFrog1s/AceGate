import ResultCard from "./result_card";

function SearchResults() {
    let info = {
        'title':'test title',
        'authors':['maple','AboveParadise','frog'],
        'time':'2022',
        'organ':'Beihang University',
        'content':'We propose a generalization of transformer neural network architecture for arbitrary graphs. The original transformer was designed for Natural Language Processing (NLP), which operates on fully connected graphs representing all connections between the words in a sequence. Such architecture does not leverage the graph connectivity inductive bias, and can perform poorly when the graph topology is important and has not been encoded into the node features',
        'labels':['graph','transform','edges']
    }
    return(
        <ResultCard props={info}/>
    )
}

export default SearchResults;
