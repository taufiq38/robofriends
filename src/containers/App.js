import React,{ Component } from 'react';
import Cardlist from '../components/Cardlist';
import Scroll from '../components/Scroll';
import Searchbox from '../components/Searchbox';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';


class App extends Component {
    constructor(){
        super()
        this.state={
            robots:[],
            searchfield:'',      
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>response.json())
            .then(users=>this.setState({robots:users}));
        
    }
    onSearchEvent = (event) => {
        this.setState({searchfield:event.target.value})
    }
    render() {
        const {searchfield,robots}=this.state
        const filteredRobots=robots.filter(robot=>{
            
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        return !robots.length ?
            <h1>loading</h1>:
        
            (
                <div className='tc'>
                    <h1 className='f1'>Robofriends</h1>
                    <Searchbox searchChange={this.onSearchEvent}/>
                    <Scroll>
                        <ErrorBoundary>
                            <Cardlist robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                    
                </div>
                
            )
        
     }  
        
    
    
}        

export default App;;