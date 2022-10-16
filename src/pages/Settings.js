/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeSettings } from '../redux/actions';
import { requestAPI } from '../services';
import Loading from '../components/Loading';

class Settings extends Component {
  state = {
    categoryList: [],
    isLoading: true,
    category: undefined,
    difficulty: undefined,
    type: undefined,

  };

  async componentDidMount() {
    const URL_CATEGORY_LIST = 'https://opentdb.com/api_category.php';
    const categoryList = await requestAPI(URL_CATEGORY_LIST);
    this.setState({
      categoryList: categoryList.trivia_categories,
    }, () => {
      this.setState({
        isLoading: false,
      });
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { category, difficulty, type } = this.state;
    const { dispatch, history } = this.props;
    const settings = [{ category }, { difficulty }, { type }];
    dispatch(changeSettings(settings));
    history.push('/');
  };

  render() {
    const { categoryList, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div className="container">
        <div className="box mt-6 has-background-grey-dark">
          <div
            className="box  has-text-centered
          has-background-danger"
          >
            <h1
              className="subtitle is-1 has-text-weight-semibold has-text-white-ter"
              data-testid="settings-title"
            >
              Settings
            </h1>
          </div>
          <div className="box has-background-warning">
            <form
              className="field is-horizontal
            is-justify-content-space-around is-align-items-center"
            >
              <div className="field box has-background-info">
                <label className="label" htmlFor="category">
                  Escolha uma Categoria
                  <div className="control">
                    <div className="select is-medium is-link">
                      <select
                        name="category"
                        onChange={ this.handleChange }
                      >
                        {categoryList.map(({ name, id }) => (
                          <option
                            key={ id }
                            value={ id }
                          >
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </label>
              </div>

              <div className="field box has-background-info">
                <label className="label" htmlFor="difficulty">
                  Escolha a dificuldade
                  <div className="control">
                    <div className="select is-medium is-link">
                      <select
                        name="difficulty"
                        onChange={ this.handleChange }
                      >
                        <option value="any">Aleatória</option>
                        <option value="easy">Fácil</option>
                        <option value="medium">Moderada</option>
                        <option value="hard">Difícil</option>
                      </select>
                    </div>
                  </div>
                </label>
              </div>
              <div className="field box has-background-info">
                <label className="label" htmlFor="type">
                  Escolha o tipo
                  <div className="control">
                    <div className="select is-medium is-link">
                      <select
                        name="type"
                        onChange={ this.handleChange }
                      >
                        <option value="any">Todos</option>
                        <option value="multiple">Múltipla Escolha</option>
                        <option value="boolean">Verdadeiro ou Falso</option>
                      </select>
                    </div>
                  </div>
                </label>
              </div>
              <div className="field ">
                <div className="control">
                  <button
                    className="button is-large is-dark has-text-weight-bold"
                    type="button"
                    onClick={ this.handleClick }
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Settings);
