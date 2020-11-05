import React, { Component } from 'react'
import Sitebar from "../layout/Navvar/Sitebar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputGroup from "../common/InputGroup";
import classnames from "classnames";
import { BASE_URL, BASE_URL_ADMIN } from "../../config";
import SelectListGroup from "../common/SelectListGroup";
import axios from "axios";
import { Checkbox, Table } from 'semantic-ui-react';
import update from 'immutability-helper';
import TableRow from './TableRow';
import {AddRolePermissionData} from "../../actions/permissionActions"
import {withSelections,WrappedComponent,Segment,Button,higherOrderComponent} from 'react-item-select';

const users = [
    {id: 1, name: 'A'},
    {id: 2, name: 'B'},
    {id: 3, name: 'C'},
    {id: 4, name: 'D'},
  ];

class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name:"",
      role:"",
      phone_number:"",
      roleList:[],
      permissionList:[],
      checkBoxArr:[],
      selections: {},
      selected: {},
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleSelect = (e) => {
    const selected = this.state.selected;
    selected[e.target.name] = e.target.checked;
    this.setState({ selected });
  }

  

  isItemSelected = id => this.state.selections[id];

  componentDidMount() {
    axios
    .get(BASE_URL_ADMIN+"/role/list",{
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      }).then(res => {
      this.setState({ roleList: res.data.data.roles });
    });

    axios
    .get(BASE_URL_ADMIN+"/permission/list",{
        headers:{
        'api-key':'57e989bf-8ddb-4ac8-9db8-820c2aaf48a6',
        'api-secret':'96201083ed8444dbb50bac971fe9ebf1'}
      }).then(res => {
      this.setState({ permissionList: res.data.data.permissions });
    });

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit( e) {
    e.preventDefault();
    // alert(JSON.stringify(this.state.selections));
    var selString = JSON.stringify(this.state.selections);
    var array = selString.replace (/"/g,'');
    var selString1 = JSON.stringify(array);
    var array1 = selString1.replace ("true",'');
    const newRolePermission = {
      role_id: this.state.role,
      permission: array1,
    };

    this.props.AddRolePermissionData(newRolePermission);

  }



    render() {
      
      const { errors } = this.state;
      const EnhancedComponent = higherOrderComponent(WrappedComponent);
   
      const MyTable = withSelections((props) => {

        const { handleSelect, isItemSelected } = props;
        const permissionOBJ = [].concat(
            this.state.permissionList.map(row => ({
              id: row.pid,
              name: row.name,
              description: row.description,
              category: row.category,
    
            }))
          );

        withSelections((props) => {
            const {
              areAllIndeterminate,
              areAllSelected,
              areAnySelected,
              selectedCount,
              handleClearAll,
              handleSelect,
              handleSelectAll,
              isItemSelected,
            } = props;
          
            const segmentStyle = {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            };
          
            return (
              <div>
                <Segment textAlign="left" style={segmentStyle}>
                  {!areAnySelected && <span>Select items in the table below</span>}
                  <div style={{ visibility: areAnySelected ? 'visible' : 'hidden' }}>
                    <span style={{marginRight: '8px'}}>{selectedCount} selected</span>
                    <Button basic onClick={handleClearAll}>Clear</Button>
                  </div>
                  <div>
                    <span>{permissionOBJ.length} permissionOBJ</span>
                  </div>
                </Segment>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        <Checkbox
                          checked={areAllSelected(permissionOBJ)}
                          indeterminate={areAllIndeterminate(permissionOBJ)}
                          onChange={() => handleSelectAll(permissionOBJ)}
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>USERNAME</Table.HeaderCell>
                      <Table.HeaderCell>FIRST</Table.HeaderCell>
                      <Table.HeaderCell>LAST</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {permissionOBJ.map(member => (
                      <Table.Row key={member.id}>
                        <Table.Cell>
                          <Checkbox
                            checked={isItemSelected(member.id)}
                            onChange={() => handleSelect(member.id)}
                          />
                        </Table.Cell>
                        <Table.Cell>{member.username}</Table.Cell>
                        <Table.Cell>{member.first}</Table.Cell>
                        <Table.Cell>{member.last}</Table.Cell>
                      </Table.Row>
                  ))}
                  </Table.Body>
                </Table>
              </div>
            );
          });
                });

    }
}



test.propTypes = {
  AddRolePermissionData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { AddRolePermissionData }
)(test);