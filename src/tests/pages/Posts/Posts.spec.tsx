import { render } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import "@testing-library/jest-dom";
import Posts, { getStaticProps } from "../../../pages/posts";
import { getPrismic } from "../../../services/prismic";

const posts = [
  {
    slug: "test-new-post",
    title: "post title",
    excerpt: "post content",
    updateAt: "23 de janeiro de 2020",
  },
];

jest.mock("../../../services/prismic");

describe("Posts Page test", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Posts posts={posts} />);

    expect(getByText("post title")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClient = mocked(getPrismic);

    getPrismicClient.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my new post",
            data: {
              title: [{ title: "heading", text: "My new Post" }],
              content: [{ type: "paragraph", text: "My new Post" }],
            },
            last_publication_date: "12-25-2021",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my new post",
              title: "My new Post",
              excerpt: "My new Post",
              updateAt: "December 25, 2021",
            },
          ],
        },
      })
    );
  });
});
