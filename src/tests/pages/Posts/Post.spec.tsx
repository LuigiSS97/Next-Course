import { render } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import "@testing-library/jest-dom";
import Post, { getStaticProps } from "../../../pages/posts/[slug]";
import { getPrismic } from "../../../services/prismic";

const post = {
  slug: "test-new-post",
  title: "post title",
  content: "<p>post content</p>",
  updateAt: "December 25, 2021",
};
jest.mock("../../../services/prismic");

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        isFallBack: false,
      };
    },
  };
});

describe("Post Page test", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Post post={post} />);

    expect(getByText("post title")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClient = mocked(getPrismic);

    getPrismicClient.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ title: "heading", text: "My new Post" }],
          content: [{ type: "paragraph", text: "<p>post content</p>" }],
        },
        last_publication_date: "12-25-2021",
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: "test-new-post" },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "test-new-post",
            title: "My new Post",
            content: "<p>post content</p>",
            updateAt: "December 25, 2021",
          },
        },
        revalidade: 43200,
      })
    );
  });
});
