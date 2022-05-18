import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import { before } from 'mocha';
import Users from '../database/models/users';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import { app } from '../app';
import { Response } from 'superagent';
import { allMatches, inProgress, finished, createMatches } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email: 'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as Users);
    })

    after(()=> {
        (Users.findOne as sinon.SinonStub).restore();
      })
  describe('Testa se o login foi feito com sucesso', () => {
    it('Se retorna o status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Se a resposta retorna o resultado correto',async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
      expect(chaiHttpResponse.body.user).to.be.deep.equal({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
      })
    });
  })
  describe('Testa se não é possível fazer login com dados errados', () => {
    it('Se retorna o status 400 e a mensagem de erro correta quando só a senha é informada', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: 'secret_admin',
        });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
    it('e retorna o status 400 e a mensagem de erro correta quando só o e-mail é informado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'sadmin@admin.com',
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    })

    it('Se retorna o status 401 e a mensagem correta quando a senha é inválida', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'passwordErrado'
      });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: 'Incorrect email or password'
      })
    })
  })
})

describe('Rota /login/validate', () => {
  let responseHTTP: Response;
  it('Testa se a requisição não consegue ser realizada sem token', async () => {
    responseHTTP = await chai
    .request(app)
    .get('/login/validate')
    .send()
    expect(responseHTTP.body).to.be.deep.equal({
      error: 'Token not found'
    })
  })
  it('Testa se a requisição é realizada com sucesso e tem o retorno esperado', async () => {
    let token;
    responseHTTP = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });
    expect(responseHTTP).to.have.status(200);

    token = responseHTTP.body.token;

    responseHTTP = await chai
    .request(app)
    .get('/login/validate')
    .set('Authorization', token)
    expect(responseHTTP.body).to.be.equal('admin');
  })
})

describe('Rota /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, 'findAll')
      .resolves([
        { id: 1, teamName: 'Avaí/Kindermann' },
        { id: 2, teamName: 'Bahia' },
        { id: 3, teamName: 'Botafogo' },
        { id: 4, teamName: 'Corinthians' },
        { id: 5, teamName: 'Cruzeiro' },
        { id: 6, teamName: 'Ferroviária' },
        { id: 7, teamName: 'Flamengo' },
        { id: 8, teamName: 'Grêmio' },
        { id: 9, teamName: 'Internacional' },
        { id: 10, teamName: 'Minas Brasília' },
        { id: 11, teamName: 'Napoli-SC' },
        { id: 12, teamName: 'Palmeiras' },
        { id: 13, teamName: 'Real Brasília' },
        { id: 14, teamName: 'Santos' },
        { id: 15, teamName: 'São José-SP' },
        { id: 16, teamName: 'São Paulo' },
      ] as Teams[]);
    })

    after(()=> {
        (Teams.findAll as sinon.SinonStub).restore();
      })
  describe('Testa se retorna os times com sucesso', () => {
    it('Se retorna o status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Se a resposta retorna o resultado correto',async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
      expect(chaiHttpResponse.body).to.be.deep.equal([
        { id: 1, teamName: 'Avaí/Kindermann' },
        { id: 2, teamName: 'Bahia' },
        { id: 3, teamName: 'Botafogo' },
        { id: 4, teamName: 'Corinthians' },
        { id: 5, teamName: 'Cruzeiro' },
        { id: 6, teamName: 'Ferroviária' },
        { id: 7, teamName: 'Flamengo' },
        { id: 8, teamName: 'Grêmio' },
        { id: 9, teamName: 'Internacional' },
        { id: 10, teamName: 'Minas Brasília' },
        { id: 11, teamName: 'Napoli-SC' },
        { id: 12, teamName: 'Palmeiras' },
        { id: 13, teamName: 'Real Brasília' },
        { id: 14, teamName: 'Santos' },
        { id: 15, teamName: 'São José-SP' },
        { id: 16, teamName: 'São Paulo' },
      ])
    });
  })
})
describe('Rota /teams/:id', () => {
  let responseHTTP: Response;

  before(async () => {
    sinon
      .stub(Teams, 'findByPk')
      .resolves(
        { id: 2, teamName: 'Bahia' } as Teams
      );
    })

    after(()=> {
        (Teams.findByPk as sinon.SinonStub).restore();
      })
  it('Testa se retorna o time específico com sucesso', async () => {
    responseHTTP = await chai
    .request(app)
    .get('/teams/2')
    .send()
    expect(responseHTTP).to.have.status(200)
    expect(responseHTTP.body).to.be.deep.equal({ id: 2, teamName: 'Bahia' })
  })
})

describe('Rota /matches', () => {
  let chaiHttpResponse: Response;
  before(async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(allMatches as unknown as Matches[]);
    })

    after(()=> {
        (Matches.findAll as sinon.SinonStub).restore();
      })
  describe('Testa se retorna todas as partidas com sucesso', () => {

    it('Se retorna o status 200', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
      expect(chaiHttpResponse).to.have.status(200);
    });
  
    it('Se a resposta retorna o resultado correto',async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
      expect(chaiHttpResponse.body).to.be.deep.equal(allMatches)
    });
  })
  describe('Rota /matches?inProgress', () => {
    it('Se só retorna as partidas em progresso', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(inProgress);
    });
  
    it('Se só retorna as partidas finalizadas',async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false');
      expect(chaiHttpResponse.body).to.be.deep.equal(finished)
    });
  })
  describe('Testa a criação de partidas', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon
        .stub(Matches, 'create')
        .resolves(createMatches as unknown as Matches);
      })

    after(()=> {
        (Matches.create as sinon.SinonStub).restore();
      })
    it('Se retorna o status 201 e a partida criada com sucesso', async () => {
      let token;
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
      expect(chaiHttpResponse).to.have.status(200);

      token = chaiHttpResponse.body.token;

      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 8,
        "awayTeamGoals": 2,
        "inProgress": true,
      })
      .set('Authorization', token);

      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(createMatches);
    });
    it('Se retorna o status 401 e a mensagem de erro impedindo a criação de partidas com times iguais', async () => {
      let token;
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
      expect(chaiHttpResponse).to.have.status(200);

      token = chaiHttpResponse.body.token;

      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 16,
        "awayTeamGoals": 2,
        "inProgress": true,
      })
      .set('Authorization', token);
      
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: 'It is not possible to create a match with two equal teams'
      });
    });
    it('Se retorna erro de status 404 quando tenta criar partida com time que não existe', async () => {
      let token;
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
      expect(chaiHttpResponse).to.have.status(200);

      token = chaiHttpResponse.body.token;

      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 4444,
        "homeTeamGoals": 2,
        "awayTeam": 7,
        "awayTeamGoals": 2,
        "inProgress": true,
      })
      .set('Authorization', token);
      
      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: 'There is no team with such id!'
      });
    });
  })
})
describe('Rota /matches/:id', () => {
  let responseHTTP: Response;
  it('Testa uma partida consegue ser atualizada retornando status 200 e corpo vazio', async () => {
    responseHTTP = await chai
    .request(app)
    .patch('/matches/44')
    .send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 2
    })
    expect(responseHTTP).to.have.status(200)
    expect(responseHTTP.body).to.be.deep.equal({})
  })
});
