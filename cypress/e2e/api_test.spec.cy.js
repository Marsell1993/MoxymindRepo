/// <reference types="cypress" />

describe('GET List Users', () => {
    const mainURL = 'https://reqres.in';

    it('Positive GET', () => {
        cy.request({
            method: 'GET',
            url: `${mainURL}/api/users?page=2`
        }).then((response) => {
            // Log status code and response
            cy.log('Status code:', response.status);
            cy.log('Response:', JSON.stringify(response.body, null, 2));
            
            // Assert status code
            expect(response.status).to.eq(200);

            // Parse the response content to JSON
            const responseJson = response.body;

            // Assert total
            expect(responseJson).to.have.property('total');
            const total = responseJson.total;
            
            const data = responseJson.data;
            const usersCount = data.length;

            // Assert that users count is not equal to total (based on your Robot Framework test)
            expect(usersCount).to.not.equal(total);

            // Assert last_name for the first and second user in data
            const firstUser = data[0];
            const secondUser = data[1];

            expect(firstUser).to.have.property('last_name');
            expect(secondUser).to.have.property('last_name');
            
            cy.log('First user\'s last name:', firstUser.last_name);
            cy.log('Second user\'s last name:', secondUser.last_name);

            // Optional: Assert data types in the response
            data.forEach((user) => {
                expect(user).to.have.property('email').that.is.a('string');
            });
        });
    });
});

describe('POST Create User', () => {
    const mainURL = 'https://reqres.in';

    it('Positive POST', () => {
        //  TDD requirement
        var data=null;
        cy.fixture('example').then((json)=> {
        data = json;  
                // Execute POST
                let starttime = new Date().getTime();
                cy.request({
                    method: 'POST',
                    url: `${mainURL}/api/users`,
                    body: data
                }).then((response) => {
                let endtime = new Date().getTime();
                let posttime = endtime - starttime;
                cy.log(posttime);
                    // Log status code and response
                    cy.log('Status code:', response.status);
                    cy.log('Response:', JSON.stringify(response.body, null, 2));
        
                    // Assert status code
                    expect(response.status).to.eq(201);
        
                    // Assert to verify the response schema
                    expect(response.body).to.have.property('name');
                    expect(response.body).to.have.property('job');
                    expect(response.body).to.have.property('id' );
                    expect(response.body).to.have.property('createdAt');
                    // Assert to verity response time
                    expect(posttime).to.be.lessThan(100);
                });      
        })


    });
});


