//  import axios from 'axios';

 const axios2 = require("axios")
 
 const BACKEND_URL = 'http://localhost:3000';
 const WS_URL = 'ws://localhost:3001';

 const axios = {
    post : async (...args) => {
        try {
            const res = await axios2.post(...args);
            return res
        } catch (error) {
            return error.response
        }
    },
    get : async (...args) => {
        try {
            const res = await axios2.get(...args);
            return res
        } catch (error) {
            return error.response
        }
    },
    put : async (...args) => {
        try {
            const res = await axios2.put(...args);
            return res
        } catch (error) {
            return error.response
        }
    },
    delete : async (...args) => {
        try {
            const res = await axios2.delete(...args);
            return res
        } catch (error) {
            return error.response
        }
    },
 }

//  Authentication tests
//  describe('Authentication', () => {
//      test('User is able to sign up', async () => {
//         const username = 'santosh' + Math.random();
//         const password = "123456";
//         // if tries to sign up, it should return 200
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, 
//             password, 
//             type: "Admin"
//         });
//         expect(response.status).toBe(200);
        

//         // if tries to sign up again, it should return 400
//         const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, 
//             password, 
//             type: "Admin"
//         });

//         expect(updatedResponse.status).toBe(400);
//      }, 10000);

//      test("Signup request fails if the username is empty", async () => {
//         const username = 'santosh' + Math.random();
//         const password = "123456";
//         // if tries to sign up, it should return 200
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             password, 
//         });
//         expect(response.status).toBe(400);
//      }, 10000)

//      test("Sign in succeeds if the username and password are correct", async () => {
//         const username = 'santosh' + Math.random();
//         const password = "1234567";
        
//         const su = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, 
//             password, 
//             type: "Admin"
//         });


//         const signInResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, 
//             password, 
//         });
//         // console.log(signInResponse.data)
//         expect(signInResponse.status).toBe(200);
//         expect(signInResponse.data.token).toBeDefined();
//      }, 10000)

//      test("Sign in fails if the username and password are incorrect", async () => {
//         const username = 'santosh' + Math.random();
//         const password = "123456";
        
//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, 
//             password, 
//             type: "Admin"
//         });

//         const signInResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, 
//             password: "wrongPassword", 
//         });
//         expect(signInResponse.status).toBe(401);
//      }, 10000)
//  });

//  // User information endpoints
//  describe('User metadata endpoints', () => {

//     let token = "";
//     let avatarId = "";
//      beforeAll(async ()=>{
//         const username = 'santosh' + Math.random();
//         const password = "123456";
        
//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, 
//             password, 
//             type: "Admin"
//         });

//         const singInResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, 
//             password
//         });

//         token = singInResponse.data.token;

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//             imageUrl: "https://example.com/avatar.jpg",
//             name : "Avatar 1"
//         }, {
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         });

//         console.log(avatarResponse.data)

//         avatarId = avatarResponse.data.avatarId;
//      }, 10000)

//      test("User can't update their metadata with a wrong avatar Id", async () => {
//         const response = await axios.put(`${BACKEND_URL}/api/v1/user/metadata`, {
//             avatarId: "wrongId"
//         }, {
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         });

//         expect(response.status).toBe(404);
//      }, 10000);

//      test("User can update their metadata with the right avatar Id", async () => {
//         const response = await axios.put(`${BACKEND_URL}/api/v1/user/metadata`, {
//             avatarId
//         }, {
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         });
//         console.log("avatarId", response.data)
//         expect(response.status).toBe(200);
//      }, 10000);

//      test("User was not able update their metadata without auth header", async () => {
//         const response = await axios.put(`${BACKEND_URL}/api/v1/user/metadata`, {
//             avatarId
//         });

//         expect(response.status).toBe(403);
//      }, 10000)
// });

// describe('User avatar information', () => {
//     let token = "";
//     let avatarId = "";
//     let userId = "";
//      beforeAll( async ()=>{
//         const username = 'santosh' + Math.random();
//         const password = "123456";
        
//         let signUpResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, 
//             password, 
//             type: "Admin"
//         });

//         userId = signUpResponse.data.userId;

//         const singInResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, 
//             password
//         });

//         token = singInResponse.data.token;

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//             imageUrl: "https://example.com/avatar.jpg",
//             name : "Avatar 1"
//         }, {
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         });

//         avatarId = avatarResponse.data.avatarId;
//      }, 10000)

//      test("Get back avatar information for a user", async () => {
//          const response = await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`, {
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         });

//          expect(response.status).toBe(200);
//          expect(response.data.avatars.length).toBe(1);
//          expect(response.data.avatars[0].userId).toBe(userId);
//      }, 10000);

//      test("Get the all available avatars", async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`, {
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         });
//         let currentAvatar = response.data.find(avatar => avatar.id === avatarId);
//         // console.log( avatarId, response, currentAvatar)

//         expect(response.status).toBe(200);
//         expect(response.data.length).not.toBe(0);
//         expect(currentAvatar).toBeDefined();
//      }, 10000)
// });

// describe("Space information", () => {

//     let AdminToken = "";
//     let AdminId = "";
//     let userToken = "";
//     let userId = "";
//     let mapId;
//     let element1Id;
//     let element2Id;

//      beforeAll(async () => {

//         // Admin signup and sign in

//         const username = 'santosh' + Math.random();
//         const password = "123456";
        
        
//         let signUpResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, 
//             password, 
//             type: "Admin"
//         });

//         AdminId = signUpResponse.data.userId;

//         const singInResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, 
//             password
//         });

//         AdminToken = singInResponse.data.token;

//         // user signup and signin

//         const normalUsername = 'santosh' + Math.random();
//         const normalPassword = "123456";
        
        
//         let normalSignUpResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username : normalUsername, 
//             password : normalPassword, 
//             type: "User"
//         });

//         userId = normalSignUpResponse.data.userId;

//         const normalSingInResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username : normalUsername, 
//             password : normalPassword
//         });

//         userToken = normalSingInResponse.data.token;

//         //

//         const element1 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true 
//         }, {
//             headers : {
//                 Authorization : `Bearer ${AdminToken}`
//             }
//         });

//         element1Id = element1.data.elementId;

//         const element2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true 
//         }, {
//             headers : {
//                 Authorization : `Bearer ${AdminToken}`
//             }
//         });

//         element2Id = element2.data.elementId;

//         const map = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements": [{
//                     elementId: element1Id,
//                     x: 20,
//                     y: 20
//                 }, {
//                     elementId: element1Id,
//                     x: 18,
//                     y: 20
//                 }, {
//                     elementId: element2Id,
//                     x: 19,
//                     y: 20
//                 }, {
//                     elementId: element2Id,
//                     x: 19,
//                     y: 20
//                 }
//             ]
//          }, {
//             headers : {
//                 Authorization : `Bearer ${AdminToken}`
//             }
//          });
//          mapId = map.data.mapId;

//      }, 30000)


//      test("User was able to create a space", async () => {

//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test",
//             "dimensions": "100x200",
//             mapId
//         }, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });
//         expect(response.status).toBe(200);
//         expect(response.data.spaceId).toBeDefined();
//      }, 10000)

//      test("User was able to create a space without mapId(empty space)", async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test",
//             "dimensions": "100x200"
//         }, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });
//         expect(response.status).toBe(200);
//         expect(response.data.spaceId).toBeDefined();
//      }, 10000);

//      test("User was not able to create a space without mapId and dimensions", async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test"
//         }, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });
//         expect(response.status).toBe(400);
//      }, 10000);

//      test("User was not able to delete a space that doesn't exist", async () => {
//         const response = await axios.delete(`${BACKEND_URL}/api/v1/space/1231`, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });
//         expect(response.status).toBe(400);
//      }, 10000);

//      test("User was able to delete a space that does exist", async () => {

//         const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space/`, {
//             "name" : "Test",
//             "dimensions" : "100x200"
//         }, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });

//         console.log(spaceResponse.data)

//         const response = await axios.delete(`${BACKEND_URL}/api/v1/space/${spaceResponse.data.spaceId}`, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });
//         expect(response.status).toBe(200);
//      }, 10000);

//      test("User should not be able to delete a space created by another user", async () => {
//         const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space/`, {
//             "name" : "Test",
//             "dimensions" : "100x200"
//         }, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         })

//         const response = await axios.delete(`${BACKEND_URL}/api/v1/space/${spaceResponse.data.spaceId}`, {
//             headers : {
//                 Authorization : `Bearer ${AdminToken}`
//             }
//         });
//         expect(response.status).toBe(403);
//      }, 10000);

//     //  test("Admin has no spaces initially", async () => {
//     //     const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
//     //         headers : {
//     //             Authorization : `Bearer ${AdminToken}`
//     //         }
//     //     });

//     //     expect(response.data.spaces.length).toBe(0);
//     //  })

//     //  test("Admin can create a space", async () => {
//     //     const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//     //         "name": "Test",
//     //         "dimensions": "100x200",
//     //         mapId
//     //     }, {
//     //         headers : {
//     //             Authorization : `Bearer ${AdminToken}`
//     //         }
//     //     });

//     //     const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
//     //         headers : {
//     //             Authorization : `Bearer ${AdminToken}`
//     //         }
//     //     });

//     //     expect(newResponse.data.spaces.length).toBe(1);
//     //  });

// });

// describe("Arena endpoints", () => {
//     let AdminToken = "";
//     let AdminId = "";
//     let userToken = "";
//     let userId = "";
//     let mapId;
//     let element1Id;
//     let element2Id;
//     let spaceId;

//      beforeAll(async ()=>{

//         // Admin signup and signin

//         const username = 'santosh' + Math.random();
//         const password = "123456";
        
        
//         let signUpResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, 
//             password, 
//             type: "Admin"
//         });

//         AdminId = signUpResponse.data.userId;

//         const singInResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, 
//             password
//         });

//         token = singInResponse.data.token;

//         // user signup and signin

//         const normalUsername = 'santosh' + Math.random();
//         const normalPassword = "123456";
        
        
//         let normalSignUpResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username : normalUsername, 
//             password : normalPassword, 
//             type: "User"
//         });

//         userId = normalSignUpResponse.data.userId;

//         const normalSingInResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username : normalUsername, 
//             password : normalPassword
//         });

//         userToken = normalSingInResponse.data.token;

//         //

//         const element1 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true 
//         }, {
//             headers : {
//                 Authorization : `Bearer ${AdminToken}`
//             }
//         });

//         element1Id = element1.data.elementId;

//         const element2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true 
//         }, {
//             headers : {
//                 Authorization : `Bearer ${AdminToken}`
//             }
//         });

//         element2Id = element2.data.elementId;

//         const map = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements": [{
//                     elementId: element1Id,
//                     x: 20,
//                     y: 20
//                 }, {
//                   elementId: element1Id,
//                     x: 18,
//                     y: 20
//                 }, {
//                   elementId: element2Id,
//                     x: 19,
//                     y: 20
//                 }, {
//                   elementId: element2Id,
//                     x: 19,
//                     y: 20
//                 }
//             ]
//          }, {
//             headers : {
//                 Authorization : `Bearer ${AdminToken}`
//             }
//          });

//          mapId = map.id;

//          const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test",
//             "dimensions": "100x200",
//             mapId
//         }, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });

//         spaceId = spaceResponse.data.spaceId

//      }, 30000);

//      test("Incorrect spaceId returns a 400", async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/123545`, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });

//         expect(response.status).toBe(400);
//      }, 10000);

//      test("Correct spaceId returns all the elements", async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });

//         expect(response.status).toBe(200);
//         expect(response.data.dimensions).toBe("100x200");
//         expect(response.data.elements).toBeDefined();
//      }, 10000);

//      test("Delete endpoint is able to delete an element", async () => {

//         const elementsResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });
//         console.log(elementsResponse.data)
//         const response = await axios.delete(`${BACKEND_URL}/api/v1/space/element`, {
//             spaceId,
//             elementId : elementsResponse.data.elements[0].id
//         }, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });

//         const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });

//         expect(newResponse.data.elements.length).toBe(3);
//      }, 10000);

//      test("adding an element works as expected", async () => {
//         const elementsResponse = await axios.get(`${BACKEND_URL}/api/v1/space/element`, {
//             "elementId": element1Id,
//             "spaceId": spaceId,
//             "x": 50,
//             "y": 20
//         }, {
//             headers : {
//                 Authorization : `Bearer ${userToken}`
//             }
//         });

//         expect(elementsResponse.status).toBe(200);
//      }, 10000);


// });

// Above all tests are based on HTTPs

// Web sockets tests
describe("Websocket tests", () => {

    let AdminToken = "";
    let AdminId = "";
    let userToken = "";
    let userId = "";
    let mapId;
    let element1Id;
    let element2Id;
    let spaceId;
    let ws1;
    let ws2;
    let ws1Messages = [];
    let ws2Messages = [];
    let AdminX;
    let AdminY;
    let userX;
    let userY;

    function waitForTheMessageAndPopLatestMessage (messagesArray){
        // we will wait for a message to come, when arrived, we pop if from array.

        return new Promise(resolve => {
            if (messagesArray.length > 0){
                resolve(messagesArray.shift())
            } else {
                let intervalId = setInterval(() => {
                    if (messagesArray.length > 0) {
                        resolve(messagesArray.shift())
                        clearInterval(intervalId)
                    }
                }, 100)
            }
        });

        // better way is
        //  while (messagesArray.length === 0) {
        //     await new Promise(resolve => setTimeout(resolve, 100));
        //  };
        //  return messagesArray.shift();

    }

    async function setUpHTTP () {

        // Admin signup and signin
        const username = 'santosh' + Math.random();
        const password = "123456";
        
        
        let signUpResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username, 
            password, 
            type: "Admin"
        });

        AdminId = signUpResponse.data.userId;

        const singInResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username, 
            password
        });

        token = singInResponse.data.token;

        // user signup and signin

        const normalUsername = 'santosh' + Math.random();
        const normalPassword = "123456";
        
        
        let normalSignUpResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username : normalUsername, 
            password : normalPassword, 
            type: "user"
        });

        userId = normalSignUpResponse.data.userId;

        const normalSingInResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username, 
            password
        });

        userToken = normalSingInResponse.data.token;

        //

        const element1 = await axios.post(`${BACKEND_URL}/api/v1/Admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
            "static": true 
        }, {
            headers : {
                Authorization : `Bearer ${AdminToken}`
            }
        });

        element1Id = element1.data.elementId;

        const element2 = await axios.post(`${BACKEND_URL}/api/v1/Admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
            "static": true 
        }, {
            headers : {
                Authorization : `Bearer ${AdminToken}`
            }
        });

        element2Id = element2.data.elementId;

        const map = await axios.post(`{BACKEND_URL}/api/v1/Admin/map`, {
            "thumbnail": "https://thumbnail.com/a.png",
            "dimensions": "100x200",
            "name": "100 person interview room",
            "defaultElements": [{
                    elementId: element1Id,
                    x: 20,
                    y: 20
                }, {
                  elementId: element1Id,
                    x: 18,
                    y: 20
                }, {
                  elementId: element2Id,
                    x: 19,
                    y: 20
                }, {
                  elementId: element2Id,
                    x: 19,
                    y: 20
                }
            ]
         }, {
            headers : {
                Authorization : `Bearer ${AdminToken}`
            }
         });

         mapId = map.id;

        const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimensions": "100x200",
            mapId
        }, {
            headers : {
                Authorization : `Bearer ${userToken}`
            }
        });

        spaceId = spaceResponse.data.spaceId
    }

    async function setUpWs () {
        ws1 = new WebSocket(WS_URL);
        ws2 = new WebSocket(WS_URL);

        await new Promise(resolve => {
            ws1.onopen = resolve
        });

        await new Promise(resolve => {
            ws2.onopen = resolve
        });

        ws1.onmessage = (event) => {
            ws1Messages.push(JSON.parse(event.data))
        };

        ws2.onmessage = (event) => {
            ws2Messages.push(JSON.parse(event.data))
        };
    }


     beforeAll(async ()=>{
        await setUpHTTP()
        await setUpWs()
     }, 30000);

     test("Getting back acknowledgement for joining the space", async () => {
        ws1.send(JSON.stringify({
            "type": "join",
            "payload": {
                "spaceId": spaceId,
                "token": AdminToken
            }
        }));

        ws2.send(JSON.stringify({
            "type": "join",
            "payload": {
                "spaceId": spaceId,
                "token": userToken
            }
        }));

        const message1 = await waitForTheMessageAndPopLatestMessage(ws1Messages);
        const message2 = await waitForTheMessageAndPopLatestMessage(ws2Messages);
        const message3 = await waitForTheMessageAndPopLatestMessage(ws1Messages);
        
        expect(message1.type).toBe("space-joined");
        expect(message2.type).toBe("space-joined");

        expect(message1.payload.users.length + message2.payload.users.length).toBe(1);

        AdminX = message1.payload.spawn.x;
        AdminY = message1.payload.spawn.y;

        userX = message2.payload.spawn.x;
        userY = message2.payload.spawn.y;

        // user joins
        expect(message3.type).toBe("user-join");
        expect(message3.payload.userId).toBe(userId);

     }, 10000);

     test("User should not be able to move across the boundary of the wall", async () => {
        ws1.send(JSON.stringify({
            "type": "move",
                "payload": {
                "x": 10000,
                "y": 10000
            }
        }));

        const message = await waitForTheMessageAndPopLatestMessage(ws1Messages);

        expect(message.type).toBe("movement-rejected");
        expect(message.payload.x).toBe(AdminX);
        expect(message.payload.y).toBe(AdminY);
     }, 10000);

     test("User should not be able to move two blocks at the same time", async () => {
        ws1.send(JSON.stringify({
            "type": "move",
                "payload": {
                "x": AdminX+2,
                "y": AdminY
            }
        }));

        const message = await waitForTheMessageAndPopLatestMessage(ws1Messages);

        expect(message.type).toBe("movement-rejected");
        expect(message.payload.x).toBe(AdminX);
        expect(message.payload.y).toBe(AdminY);
     }, 10000);

     test("Correct movement should be notified to others in the room", async () => {
        ws1.send(JSON.stringify({
            type: "move",
            payload : {
                x : AdminX+1,
                y : AdminY
            }
        }));

        const message2 = await waitForTheMessageAndPopLatestMessage(ws2Messages);

        expect(message2.type).toBe("movement");
        expect(message2.payload.x).toBe(AdminX+1);
        expect(message2.payload.x).toBe(AdminY);
        expect(message2.payload.userId).toBe(AdminId);

     }, 10000);

     test("If the user leaves, the other user receives a leave event", async () => {
        ws1.close();

        const message = await waitForTheMessageAndPopLatestMessage(ws2Messages);

        expect(message.type).toBe("user-left");
        expect(message.payload.userID).toBe(AdminId);
     }, 10000);
})



