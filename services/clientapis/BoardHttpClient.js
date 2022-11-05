import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../queries/mutations';
import * as queries from '../../queries/queries';

//Todo these should parse the response and determine errors
export async function CreatePost(post) {
	return await API.graphql(graphqlOperation(mutations.createPost, {
		input: post
	}));
}

export async function UpdatePost(post) {
	return await API.graphql(graphqlOperation(mutations.updatePost, {
		input: post
	}));
}

export async function DeletePost(id) {
	return await API.graphql(graphqlOperation(mutations.deletePost, {
		input: { id: id } 
	}));
}

export async function GetPost(id) {
	return await API.graphql({ query: queries.getPost, variables: {
		id: id
	}});
}

export async function GetPostsWithTags(tags, nextToken) {
	const filter = {
		and: tags.map(tag => ({ tags: { contains: tag }}))
	};

	const variables = { filter: filter, limit:16 };
	if (nextToken) {
		variables['nextToken'] = nextToken;
	}

	return API.graphql({query: queries.listPosts, variables: variables});
}

export async function SearchPostsWithTags(tags, nextToken, and=false) {
	const filter = {
		or: tags.map(tag => ({ tags: { match: tag }}))
	};

	if (and) {
		filter['and'] = filter['or'];
		delete filter['or'];
	}

	const variables = { 
		filter: filter,
		nextToken: nextToken 
	};

	return API.graphql({ query: queries.searchPosts, variables: variables });
}

export async function GetPostComments(postId, nextToken) {
	return API.graphql({query: queries.topCommentsByPost, variables: {
		postID: postId,
		nextToken: nextToken,
		limit: 5
	}});
}

export async function GetPostsByDate(tags, nextToken) {
	const filter = {
		and: tags.map(tag => ({ tags: { contains: tag }}))
	};

	const variables = {
		dateType: "post", 
		filter: filter, 
		sortDirection: 'DESC',
		limit:16
	};
	if (nextToken) {
		variables['nextToken'] = nextToken;
	}

	return API.graphql({query: queries.postsByDate, variables: variables });
}

export async function GetPostsByLikes(tags, nextToken) {
	const filter = {
		and: tags.map(tag => ({ tags: { contains: tag }}))
	};

	const variables = {
		likesType: "post", 
		filter: filter, 
		sortDirection: 'DESC',
		limit:16
	};

	if (nextToken) {
		variables['nextToken'] = nextToken;
	}

	return API.graphql({query: queries.postsByLikes, variables: variables });
}

export async function GetPostsByTrending(tags, nextToken) {
	const filter = {
		and: tags.map(tag => ({ tags: { contains: tag }}))
	};

	const variables = {
		trendingType: "post",
		filter: filter,
		sortDirection: 'DESC',
		limit:16
	};
	if (nextToken) {
		variables['nextToken'] = nextToken;
	}

	return API.graphql({query: queries.postsByTrending, variables: variables });
}

export async function GetPostsInCategoryByTrending(tags, category, nextToken) {
	const filter = {
		and: tags.map(tag => ({ tags: { contains: tag }}))
	};

	const variables = { 
		categoryTrending: category,
		filter: filter,
		sortDirection: 'DESC',
		limit: 16
	}

	if (nextToken) {
		variables['nextToken'] = nextToken;
	}

	return API.graphql({query: queries.postsByCategoryAndTrending, variables: variables});
}

export async function GetPostsInCategoryByNoLikes(tags, category, nextToken) {
	const filter = {
		and: tags.map(tag => ({ tags: { contains: tag }}))
	};

	const variables = { 
		categoryNoLikes: category,
		filter: filter,
		sortDirection: 'DESC',
		limit: 16
	}

	if (nextToken) {
		variables['nextToken'] = nextToken;
	}

	return API.graphql({query: queries.postsByCategoryAndNoLikes, variables: variables});
}

export async function GetPostsInCategoryByCreatedAt(tags, category, nextToken) {
	const filter = {
		and: tags.map(tag => ({ tags: { contains: tag }}))
	};

	const variables = { 
		categoryCreatedAt: category,
		filter: filter,
		limit: 16
	}

	if (nextToken) {
		variables['nextToken'] = nextToken;
	}

	return API.graphql({query: queries.postsByCategoryAndDate, variables: variables});
}

export async function GetChildComments(parentId, nextToken) {
	return API.graphql({query: queries.childCommentsByTopComment, variables: {
		topcommentID: parentId,
		nextToken: nextToken,
		limit: 5
	}});
}

export async function CreateTopComment(topComment) {
	return await API.graphql(graphqlOperation(mutations.createTopComment, {
		input: topComment 
	}));
}

export async function CreateChildComment(childComment) {
	return await API.graphql(graphqlOperation(mutations.createChildComment, {
		input: childComment 
	}));
}

export async function UpvotePost(postID, noLikes, version) {
	return await API.graphql(graphqlOperation(mutations.updatePost, {
		input: { id: postID, noLikes: noLikes, _version: version }
	}));
}

export async function IncrementPostComments(postID, noComments, version) {
	return await API.graphql(graphqlOperation(mutations.updatePost, {
		input: { id: postID, noComments: noComments, _version: version }
	}));
}

export async function CreatePostUpvote(postupvote) {
	return await API.graphql(graphqlOperation(mutations.createPostUpvote, {
		input: postupvote
	}));
}

export async function CountPostUpvotes(postID) {
	const countPostUpvotes = `
	  query SearchPostUpvotes(
	    $filter: SearchablePostUpvoteFilterInput
	    $sort: [SearchablePostUpvoteSortInput]
	    $limit: Int
	    $nextToken: String
	    $from: Int
	    $aggregates: [SearchablePostUpvoteAggregationInput]
	  ) {
	    searchPostUpvotes(
	      filter: $filter
	      sort: $sort
	      limit: $limit
	      nextToken: $nextToken
	      from: $from
	      aggregates: $aggregates
	    ) {
	      total
	    }
	  }
	`;

	const filter = {
		postID: {
			eq: postID
		}
	};

	return await API.graphql({ query: countPostUpvotes, variables: { filter: filter } });
}

export async function GetPostUpvote(postID, owner) {
	return await API.graphql({ query: queries.getPostUpvote, variables: {
		postID: postID,
		owner: owner
	}});
}

export async function CreateUserAttributes(attributes) {
	return await API.graphql(graphqlOperation(mutations.createUserAttributes, {
		input: attributes 
	}));
}

export async function CreateTag(tag) {
	return await API.graphql(graphqlOperation(mutations.createTag, {
		input: tag 
	}));
}

export async function GetUserAttributesByOwner(owner) {

	return await API.graphql({ query: queries.getUserAttributes, variables: { owner: owner } });
}

export async function QueryTags(q) {
	let filter = {
		name: {
			matchPhrasePrefix: q
		}
	};
	
	return await API.graphql({ query: queries.searchTags, variables: { filter: filter } });
}

export async function SearchPosts(q) {
	let filter = {
		title_caseless: {
			matchPhrasePrefix: q
		}
	}

	return await API.graphql({ query: queries.searchPosts, variables: { filter: filter } });
}

export async function CreateStudyUpvote(studyUpvote) {
	return await API.graphql(graphqlOperation(mutations.createStudyUpvote, {
		input: studyUpvote 
	}));
}

export async function UpvoteStudy(studyId, noUpvotes, version) {
	return await API.graphql(graphqlOperation(mutations.updateStudy, {
		input: { nctId: studyId, noUpvotes: noUpvotes, _version: version }
	}));
}

export async function GetStudy(studyId) {
	return await API.graphql({ query: queries.getStudy, variables: {
		nctId: studyId,
	}, authMode: 'API_KEY'})
}

export async function GetStudiesByLikes(nextToken, limit=20) {
	return await API.graphql({ query: queries.studiesByUpvotes, variables: {
		nextToken: nextToken,
		limit: limit,
		noUpvotesType: 'upvote',
		sortDirection: 'DESC'
	}, authMode: 'API_KEY'})
}

export async function GetStudyUpvote(studyId, owner) {
	return await API.graphql({ query: queries.getStudyUpvote, variables: {
		studyID: studyId,
		owner: owner
	}});
}
