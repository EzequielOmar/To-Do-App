import gql from 'graphql-tag';

export const GET_ALL_DATA_QUERY = gql`
  query User {
    User {
      _id
      name
      ufolders {
        _id
        name
        owner
        ftasks {
          _id
          name
          done
          folder
        }
      }
    }
  }
`;

export const UPDATE_USER_NAME = gql`
  mutation updateUserName($name: String!) {
    updateUserName(name: $name) {
      _id
      name
      provId
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      _id
      name
    }
  }
`;

export const NEW_FOLDER_MUTATION = gql`
  mutation createFolder($name: String!) {
    createFolder(name: $name) {
      _id
      name
      owner
    }
  }
`;

export const UPDATE_FOLDER_MUTATION = gql`
  mutation updateFolder($id: ID!, $name: String!) {
    updateFolder(payload: { _id: $id, name: $name }) {
      _id
      name
    }
  }
`;

export const DELETE_FOLDER_MUTATION = gql`
  mutation deleteFolder($id: ID!) {
    deleteFolder(_id: $id) {
      _id
      name
    }
  }
`;

export const NEW_TASK_MUTATION = gql`
  mutation createTask($name: String!, $folder: ID!) {
    createTask(payload: { name: $name, folder: $folder }) {
      _id
      name
      done
      folder
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: ID!, $name: String, $done: Boolean) {
    updateTask(payload: { _id: $id, name: $name, done: $done }) {
      _id
      name
      done
      folder
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(_id: $id) {
      _id
      name
      done
      folder
    }
  }
`;
