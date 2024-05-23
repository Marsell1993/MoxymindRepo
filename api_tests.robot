*** Settings ***

Library    RequestsLibrary
Library    Collections

*** Variables ***

${main_URL}     https://reqres.in


*** Test Cases ***

### GET ###
Get_List_Users
    [Documentation]     Positive GET
    ${response}=    GET    url=${mainURL}/api/users?page=2
    Log    Status code: ${response.status_code}
    Log    Response: ${response.content}
    Should Be Equal As Strings    ${response.status_code}    200

    # Parse the response -> JSON
    ${response_json}=    Evaluate    json.loads('''${response.content}''')    json
    
    # Assert total
    Dictionary Should Contain Key    ${response_json}    total
    ${total}=    Get From Dictionary    ${response_json}    total
    
    ${data}=    Get From Dictionary    ${response_json}    data
    
    ${users_count}=    Get Length    ${data}    

    Should Not Be Equal As Numbers    ${users_count}    ${total}

    # Assert last_name
    ${first_user}=    Get From List    ${data}    0
    ${second_user}=    Get From List    ${data}    1
    
    Dictionary Should Contain Key    ${first_user}    last_name
    Dictionary Should Contain Key    ${second_user}    last_name
    
    Log    First user's last name: ${first_user['last_name']}
    Log    Second user's last name: ${second_user['last_name']}
    
    # Optional: Assert data types in the response
    FOR    ${user}    IN    @{data}
    ${email}=        Get From Dictionary    ${user}    email
    Should Be True    ${email} == str(${email})    Employee email should be a string
    END

### POST ###
POST_Create_User
    [Documentation]    Positive POST
    ${body}=    Create Dictionary    name=morpheus    job=leader
    ${response}=    POST    ${main_URL}/api/users    json=${body}
    Log    Status code: ${response.status_code}
    Log    Response: ${response.content}
    Should Be Equal As Strings    ${response.status_code}    201



*** Keywords ***

