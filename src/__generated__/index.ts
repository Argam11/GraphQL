import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddGameInput = {
  platforms: Array<InputMaybe<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reviews: Array<Review>;
  verified: Scalars['Boolean']['output'];
};

export type EditGameInput = {
  platforms?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Game = {
  __typename?: 'Game';
  averageRating?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  platforms: Array<Scalars['String']['output']>;
  reviews: Array<Review>;
  title: Scalars['String']['output'];
};

export type Games = {
  __typename?: 'Games';
  data: Array<Maybe<Game>>;
  paginationInfo: Pagination;
};

export type Mutation = {
  __typename?: 'Mutation';
  addGame?: Maybe<Game>;
  deleteGame?: Maybe<Game>;
  updateGame?: Maybe<Game>;
};


export type MutationAddGameArgs = {
  input: AddGameInput;
};


export type MutationDeleteGameArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateGameArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<EditGameInput>;
};

export type Pagination = {
  __typename?: 'Pagination';
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  authors?: Maybe<Array<Maybe<Author>>>;
  game?: Maybe<Game>;
  games?: Maybe<Games>;
  review?: Maybe<Review>;
  reviews?: Maybe<Array<Maybe<Review>>>;
};


export type QueryAuthorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGameArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGamesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReviewArgs = {
  id: Scalars['ID']['input'];
};

export type Review = {
  __typename?: 'Review';
  author: Author;
  content: Scalars['String']['output'];
  game: Game;
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
};

export type ReviewInput = {
  author_id: Scalars['String']['input'];
  content: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
};

export type AddGameFragmentFragment = { __typename?: 'Game', id: string, title: string, platforms: Array<string>, averageRating?: number | null };

export type AddGameMutationVariables = Exact<{
  input: AddGameInput;
}>;


export type AddGameMutation = { __typename?: 'Mutation', addGame?: { __typename?: 'Game', id: string, title: string, platforms: Array<string>, averageRating?: number | null } | null };

export type UpdateGameMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: EditGameInput;
}>;


export type UpdateGameMutation = { __typename?: 'Mutation', updateGame?: { __typename?: 'Game', id: string, title: string, platforms: Array<string>, averageRating?: number | null } | null };

export type DeleteGameMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteGameMutation = { __typename?: 'Mutation', deleteGame?: { __typename?: 'Game', id: string } | null };

export type GetGamesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetGamesQuery = { __typename?: 'Query', games?: { __typename?: 'Games', data: Array<{ __typename?: 'Game', id: string, title: string, platforms: Array<string>, averageRating?: number | null, reviews: Array<{ __typename?: 'Review', id: string, rating: number, content: string, game: { __typename?: 'Game', title: string }, author: { __typename?: 'Author', name: string } }> } | null>, paginationInfo: { __typename?: 'Pagination', total: number } } | null };

export type GetGameQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetGameQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string, title: string, platforms: Array<string>, averageRating?: number | null, reviews: Array<{ __typename?: 'Review', id: string, rating: number, content: string, game: { __typename?: 'Game', title: string }, author: { __typename?: 'Author', name: string, verified: boolean, reviews: Array<{ __typename?: 'Review', id: string, rating: number, content: string, game: { __typename?: 'Game', id: string, title: string } }> } }> } | null };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddGameInput: AddGameInput;
  Author: ResolverTypeWrapper<Author>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  EditGameInput: EditGameInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Game: ResolverTypeWrapper<Game>;
  Games: ResolverTypeWrapper<Games>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Pagination: ResolverTypeWrapper<Pagination>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  ReviewInput: ReviewInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddGameInput: AddGameInput;
  Author: Author;
  Boolean: Scalars['Boolean']['output'];
  EditGameInput: EditGameInput;
  Float: Scalars['Float']['output'];
  Game: Game;
  Games: Games;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Pagination: Pagination;
  Query: {};
  Review: Review;
  ReviewInput: ReviewInput;
  String: Scalars['String']['output'];
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  averageRating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  platforms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GamesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Games'] = ResolversParentTypes['Games']> = {
  data?: Resolver<Array<Maybe<ResolversTypes['Game']>>, ParentType, ContextType>;
  paginationInfo?: Resolver<ResolversTypes['Pagination'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<MutationAddGameArgs, 'input'>>;
  deleteGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<MutationDeleteGameArgs, 'id'>>;
  updateGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<MutationUpdateGameArgs, 'id'>>;
};

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryAuthorArgs, 'id'>>;
  authors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Author']>>>, ParentType, ContextType>;
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<QueryGameArgs, 'id'>>;
  games?: Resolver<Maybe<ResolversTypes['Games']>, ParentType, ContextType, Partial<QueryGamesArgs>>;
  review?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryReviewArgs, 'id'>>;
  reviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['Review']>>>, ParentType, ContextType>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  game?: Resolver<ResolversTypes['Game'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  Games?: GamesResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
};


export const AddGameFragmentFragmentDoc = gql`
    fragment AddGameFragment on Game {
  id
  title
  platforms
  averageRating
}
    `;
export const AddGameDocument = gql`
    mutation AddGame($input: AddGameInput!) {
  addGame(input: $input) {
    ...AddGameFragment
  }
}
    ${AddGameFragmentFragmentDoc}`;
export type AddGameMutationFn = Apollo.MutationFunction<AddGameMutation, AddGameMutationVariables>;

/**
 * __useAddGameMutation__
 *
 * To run a mutation, you first call `useAddGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGameMutation, { data, loading, error }] = useAddGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddGameMutation(baseOptions?: Apollo.MutationHookOptions<AddGameMutation, AddGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddGameMutation, AddGameMutationVariables>(AddGameDocument, options);
      }
export type AddGameMutationHookResult = ReturnType<typeof useAddGameMutation>;
export type AddGameMutationResult = Apollo.MutationResult<AddGameMutation>;
export type AddGameMutationOptions = Apollo.BaseMutationOptions<AddGameMutation, AddGameMutationVariables>;
export const UpdateGameDocument = gql`
    mutation UpdateGame($id: ID!, $input: EditGameInput!) {
  updateGame(id: $id, input: $input) {
    ...AddGameFragment
  }
}
    ${AddGameFragmentFragmentDoc}`;
export type UpdateGameMutationFn = Apollo.MutationFunction<UpdateGameMutation, UpdateGameMutationVariables>;

/**
 * __useUpdateGameMutation__
 *
 * To run a mutation, you first call `useUpdateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGameMutation, { data, loading, error }] = useUpdateGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGameMutation, UpdateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGameMutation, UpdateGameMutationVariables>(UpdateGameDocument, options);
      }
export type UpdateGameMutationHookResult = ReturnType<typeof useUpdateGameMutation>;
export type UpdateGameMutationResult = Apollo.MutationResult<UpdateGameMutation>;
export type UpdateGameMutationOptions = Apollo.BaseMutationOptions<UpdateGameMutation, UpdateGameMutationVariables>;
export const DeleteGameDocument = gql`
    mutation DeleteGame($id: ID!) {
  deleteGame(id: $id) {
    id
  }
}
    `;
export type DeleteGameMutationFn = Apollo.MutationFunction<DeleteGameMutation, DeleteGameMutationVariables>;

/**
 * __useDeleteGameMutation__
 *
 * To run a mutation, you first call `useDeleteGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGameMutation, { data, loading, error }] = useDeleteGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGameMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGameMutation, DeleteGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGameMutation, DeleteGameMutationVariables>(DeleteGameDocument, options);
      }
export type DeleteGameMutationHookResult = ReturnType<typeof useDeleteGameMutation>;
export type DeleteGameMutationResult = Apollo.MutationResult<DeleteGameMutation>;
export type DeleteGameMutationOptions = Apollo.BaseMutationOptions<DeleteGameMutation, DeleteGameMutationVariables>;
export const GetGamesDocument = gql`
    query GetGames($page: Int) {
  games(page: $page) {
    data {
      ...AddGameFragment
      reviews {
        id
        rating
        content
        game {
          title
        }
        author {
          name
        }
      }
    }
    paginationInfo {
      total
    }
  }
}
    ${AddGameFragmentFragmentDoc}`;

/**
 * __useGetGamesQuery__
 *
 * To run a query within a React component, call `useGetGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGamesQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetGamesQuery(baseOptions?: Apollo.QueryHookOptions<GetGamesQuery, GetGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGamesQuery, GetGamesQueryVariables>(GetGamesDocument, options);
      }
export function useGetGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGamesQuery, GetGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGamesQuery, GetGamesQueryVariables>(GetGamesDocument, options);
        }
export function useGetGamesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGamesQuery, GetGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGamesQuery, GetGamesQueryVariables>(GetGamesDocument, options);
        }
export type GetGamesQueryHookResult = ReturnType<typeof useGetGamesQuery>;
export type GetGamesLazyQueryHookResult = ReturnType<typeof useGetGamesLazyQuery>;
export type GetGamesSuspenseQueryHookResult = ReturnType<typeof useGetGamesSuspenseQuery>;
export type GetGamesQueryResult = Apollo.QueryResult<GetGamesQuery, GetGamesQueryVariables>;
export const GetGameDocument = gql`
    query GetGame($id: ID!) {
  game(id: $id) {
    ...AddGameFragment
    reviews {
      id
      rating
      content
      game {
        title
      }
      author {
        name
        verified
        reviews {
          id
          rating
          content
          game {
            id
            title
          }
        }
      }
    }
  }
}
    ${AddGameFragmentFragmentDoc}`;

/**
 * __useGetGameQuery__
 *
 * To run a query within a React component, call `useGetGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetGameQuery(baseOptions: Apollo.QueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
      }
export function useGetGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
        }
export function useGetGameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, options);
        }
export type GetGameQueryHookResult = ReturnType<typeof useGetGameQuery>;
export type GetGameLazyQueryHookResult = ReturnType<typeof useGetGameLazyQuery>;
export type GetGameSuspenseQueryHookResult = ReturnType<typeof useGetGameSuspenseQuery>;
export type GetGameQueryResult = Apollo.QueryResult<GetGameQuery, GetGameQueryVariables>;