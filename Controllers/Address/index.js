const db = require("../../Models");

const message = {
    notFound: "Not Found .",
};

// 내부 함수
const _initailizeDefault = async () => {
    const defaultAddress = await db.Address.findOne({
        where: {
            default: 1
        }
    });
    //2 기존의 기본 값이 있는지를 찾고
    if (defaultAddress) {
        //3 찾은 거를 일반으로 만들어,
        await db.Address.update({
            default: 0
        }, {
            where: {
                id: defaultAddress.id
            }
        })
    }
};

const _setDefault = async (addressId) => {
    try {
        return await db.Address.update({
            default: 1
        }, {
            where: {
                id: addressId
            }
        })
    } catch (e) {
        throw e
    }
};

const _getAll = async ({offset = 0, limit}) => {
    return db.Address.findAll({
        attributes: ['id', 'name', 'postnumber', 'default', 'address'],
        offset: offset,
        limit: limit,
        order: [
            ['default', 'DESC'],
            ['createdAt', 'DESC']
        ]
    });
};

//외부 함수
const getCount = async () =>{
    try{
        const r = await db.Address.findAll();
        return r.length;
    }catch (e) {
        throw e
    }
}

const getAddress = async ({offset = 0, limit = 5}) => {
    try {
        return await _getAll({offset, limit});
    } catch (e) {
        throw e;
    }
};

const postAddress = async (addressInfo) => {
    try {
        //1 새로 만든 것을 기본으로 설정 했다면,
        if (addressInfo.default) {
            await _initailizeDefault();
        }

        return await db.Address.create({
            name: addressInfo.name,
            postnumber: addressInfo.postnumber,
            address: addressInfo.address,
            default: addressInfo.default,
        });

    } catch (e) {
        throw e;
    }
};

const setDefault = async (addressId) => {
    try {
        const address = await db.Address.findOne({where: {id: addressId}});
        if (!address) {
            throw new Error(message.notFound);
        }
        await _initailizeDefault();
        await _setDefault(addressId);
        return addressId
    } catch (e) {
        throw e
    }
};

const deleteAddress = async (addressId) => {
    try {
        return await db.Address.destroy({
            where: {
                id: addressId
            }
        })
    } catch (e) {
        throw e;
    }
};

module.exports = {
    getCount:getCount,
    getAddress: getAddress,
    postAddress: postAddress,
    setDefault: setDefault,
    deleteAddress: deleteAddress
};

//
// const _getPostById = async ({ postId }) => {
//     return db.Post.findOne({
//         where: {
//             id: postId
//         }
//     })
// };
// const _getPosts = async () => {
//     return db.Post.findAll({
//         order: [
//             ['id', 'DESC'],
//             // ['name', 'ASC'],
//         ],
//         attributes: ['id', 'author', 'title', 'content', "tag"],
//     })
// }
// const _check = async ({ postId, password }) => {
//     const post = await db.Post.findOne({
//         where: {
//             id: postId
//         }
//     });
//     if (!post) {
//         throw Error(postMessage.notFoundPost);
//     }
//
//     const jsonPost = post.toJSON();
//     console.log(jsonPost)
//     console.log(password)
//     const match = await bcrypt.compareSync(password, jsonPost.password);
//     return !!match;
// };
//
//
// module.exports = {
//
//     getPost: async ({ postId }) => {
//         try {
//             if (postId) {
//                 return await _getPostById({ postId });
//             }
//             return await _getPosts();
//         } catch (error) {
//             throw error;
//         }
//     },
//     deletePost: async ({ postId, password }) => {
//         try {
//
//             if (!password) {
//                 throw Error(postMessage.invalidPassword);
//             }
//
//             const match = await _check({ postId, password });
//             if (!match) {
//                 throw Error(postMessage.notMatchedPassword)
//             }
//
//             return await db.Post.destroy({
//                 where: { id: postId }
//             });
//         } catch (error) {
//             throw error;
//         }
//     },
//     createPost: async ({ post }) => {
//         try {
//
//             const hashed = await bcrypt.hash(post.password, 12);
//             const query = {
//                 title: post.title,
//                 content: post.content,
//                 author: post.author,
//                 tag: post.tag,
//                 password: hashed
//             };
//
//             const newPost = await db.Post.create(query);
//             if (post.src) {
//                 const newImage = await db.Image.create({
//                     src: post.src
//                 });
//                 await newPost.addImage(newImage);
//             }
//             return db.Post.findOne({
//                 where: {
//                     id: newPost.id
//                 },
//                 include: [{
//                     model: db.Image,
//                     attributes: ['src']
//                 }],
//                 attributes: ['id', 'author', 'title', 'content', 'tag']
//             })
//             // { title: 'asd', content: 'asd', author: 'asd', password: 'asd' ,filename}
//         } catch (error) {
//             throw error;
//         }
//     },
//     updatePost: async ({ post, postId }) => {
//
//         try {
//
//             const match = await _check({ postId, password: post.password });
//
//             if (!match) {
//                 throw Error(postMessage.notMatchedPassword);
//             }
//
//             const query = {
//                 title: post.title, content: post.content,
//                 tag: post.tag,
//             };
//
//
//
//             await db.Post.update(query, { where: { id: postId } });
//
//             return db.Post.findOne({
//                 where: {
//                     id: postId
//                 },
//                 attributes: ['id', 'author', 'title', 'content', 'tag']
//             });
//         } catch (error) {
//             throw error;
//         }
//     },
//
// };