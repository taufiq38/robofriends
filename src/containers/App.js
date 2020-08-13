import React,{ Component } from 'react';
import {connect} from 'react-redux';
import Cardlist from '../components/Cardlist';
import Scroll from '../components/Scroll';
import Searchbox from '../components/Searchbox';
import './App.css';
import {setSearchField, requestRobots } from '../actions';

const mapStateToProps= state=>{
    return{
        searchField:state.searchRobots.searchField,
        robots:state.requestRobots.robots,
        isPending:state.requestRobots.isPending,
        error:state.requestRobots.error,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
    onSearchChange:(event)=>dispatch(setSearchField(event.target.value)),
    onRequestRobots:()=>requestRobots(dispatch)
    }
}


class App extends Component {
    constructor(){
        super()
        this.state={
            robots:[]     
        }
    }
    componentDidMount(){
        
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>response.json())
            .then(users=>this.setState({robots:users}));
        
    }
    
    render() {
        const {robots}=this.state;
        const {searchField,onSearchChange}=this.props;
        const filteredRobots=robots.filter(robot=>{
            
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        return !robots.length ?
            <h1>loading</h1>:
        
            (
                <div className='tc'>
                    <h1 className='f1'>Robofriends</h1>
                    <Searchbox searchChange={onSearchChange}/>
                    <Scroll>
                        
                            <Cardlist robots={filteredRobots} />
                        
                    </Scroll>
                    
                </div>
                
            )
        
     }  
        
    
    
}        

export default connect(mapStateToProps,mapDispatchToProps) (App);