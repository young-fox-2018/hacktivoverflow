# HacktivOverflow

## **Table of Contents**
- [Description](#description)
- [URL](#url)
- [Method](#method)
    

## <a id="description"></a> Description
HacktivOverflow is a website inspired by Stack Overflow. The main purpose is to train the skills learned in Phase 2 of Hacktiv8

## <a id="url"></a>URL
http://localhost:3000/ho

## <a id="method"></a> Method:
#<a id="signup"></a> Route | HTTP | Description
------|------|------------
/ho/signup | POST | Register a new user

## Data Params
Name: 
- ex: Bob Billington
- type: String

Email: 
- ex: example@mail.com
- type: String

Password: 
- ex: Password
- type: String

## Success Response
Code: 201

Content: 

    {
        message: "You have successfully signed up",
        data: 
            {
                questions: [],
                answers: [],
                _id": 5bf26f01cc8d302f5ec62de5,
                email: example@mail.com,
                password: Encrypted Password,
                name: Bob Billington,
            },
        token: <token>
  }

## Error Response
Code: 400

Content:

    {
        message: Email already taken
    }

    Ocurrence: when a user enters an email that has already been used

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/ho/signin | POST | log in into the site

## Data Params
email: 
- ex: example@mail.com
- type: String

password:
- ex: Password
- type: String

## Success Response

Code: 200

Content: 

    {
        message: "Successfully logged in",
        token: <token>
    }

## Error Response

Code: 400

Content:

    {
        message: User not found
        OR
        message: Password Incorrect
    }

    Ocurrence: when a user enters an invalid email or password

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/ho/question | GET | get all questions

## Data Params
None

## Success Response

Code: 200

Content: 

    {
        message: "Data retrieval success",
        data:
        {
            <question properties here>
        }
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/ho/question/add | POST | post a question

## Data Params
title:
- ex: What is life?
- type: String

description:
- ex: Has anyone figure out the meaning of Life?
- type: String

userId:
- ex: 5bf26f01cc8d302f5ec62de5
- type: Mongoose.ObjectId


## Success Response

Code: 201

Content: 

    {
        message: "Question successfully created"
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/ho/question/delete | DELETE | delete a question

## Data Params
title:
- ex: Why is edit?
- type: String

description:
- ex: Has anyone figure out the meaning of edited?
- type: String

questionId:
- ex: 5bf297ab62aa44596c89a275
- type: Mongoose.ObjectId

UserId:
- ex: 5bf26f01cc8d302f5ec62de5
- type: Mongoose.ObjectId


## Success Response

Code: 200

Content: 

    {
        message: "Question successfully edited"
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/ho/question/edit | PUT | edit a question

## Data Params
questionId:
- ex: 5bf297ab62aa44596c89a275
- type: Mongoose.ObjectId

userId:
- ex: 5bf26f01cc8d302f5ec62de5
- type: Mongoose.ObjectId


## Success Response

Code: 200

Content: 

    {
        message: "Question successfully deleted"
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/ho/answer | GET | get all answers

## Data Params
None

## Success Response

Code: 200

Content: 

    {
        message: "Data retrieval success",
        data:
        {
            <answer properties here>
        }
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/ho/answer/add | POST | post an answer

## Data Params
title:
- ex: The Answer
- type: String

description:
- ex: The Meaning of life is to ...
- type: String

questionId:
- ex: 5bf298b35f5d085a06028577
- type: Mongoose.ObjectId


## Success Response

Code: 201

Content: 

    {
        message: "Question successfully created"
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/ho/answer/edit | PUT | edit an answer

## Data Params
title:
- ex: The Answer (edited)
- type: String

description:
- ex: The (Edited) Meaning of life is to ...
- type: String

userId:
- ex: 5bf26f01cc8d302f5ec62de5
- type: Mongoose.ObjectId

answerId:
- ex: 5bf2a7c24f8a9064b733abcd
- type: Mongoose.ObjectId


## Success Response

Code: 200

Content: 

    {
        message: "Question successfully deleted"
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }