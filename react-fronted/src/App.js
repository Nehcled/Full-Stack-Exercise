import React,{Component} from 'react';

class App extends Component {
  state = {  
    list:true,
    card:false,
    players:[],
    player:{}
  }
  async componentDidMount(){
    let data = await fetch('http://localhost:3000/players/list')
    let newdata = await data.json()
    this.setState({
      players:newdata.data
    })
  }
  showCard = async id=>{
    let cardi = await fetch(`http://localhost:3000/players/${id}`)
    let newcardi = await cardi.json();
    this.setState({
      player:newcardi.data,
      list:false,
      card:true
    })
  }
  showList = () =>{
    this.setState({
      card:false,
      list:true
    })
  }
  test =()=>{
    console.log=('hello')
  }
  render() { 
    return (  
      <div claassName = 'container'>
         {this.state.list?(
          <div className = 'list-group'> 
            {this.state.players.map(player =>(
              <div className ='list-group-item list-group-item-action'onClick = {()=>this.showCard(player._id)}>{player.name}</div> 
            ))} 
          </ div> 
         ):null}
         {this.state.card?(
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{this.state.player.name}</h5>
              <p className="card-text">{this.state.player.runs}</p>
              <div onClick={() => this.showList()} className="btn btn-primary">
                Back
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
 
export default App;