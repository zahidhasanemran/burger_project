import React,{Component} from 'react';


const asyncComLoader = (importComFunc) => {
    return class extends Component {

        state = {
            component: null
        };

        componentDidMount(){
            importComFunc()
            .then(cmp => {
                console.log(cmp);
                this.setState({component: cmp.default});
            });
        }
    
        render(){

            let Compo = this.state.component;

            return Compo ? <Compo {...this.props} /> : null

        }
    }
}

export default asyncComLoader;