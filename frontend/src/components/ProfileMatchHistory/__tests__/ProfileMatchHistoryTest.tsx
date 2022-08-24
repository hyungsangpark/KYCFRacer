import { render } from "@testing-library/react";

const { MemoryRouter } = require("react-router-dom");
import ProfileMatchHistory from "../ProfileMatchHistory";
import { useAuth0 } from "@auth0/auth0-react";
import mocked = jest.mocked;
import { MatchHistoryItem } from "../../../utils/Types/ApiTypes";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};

jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0, true);

describe("ProfileMatchHistory", () => {
  const dummyMatchHistory: MatchHistoryItem[] = [
    {
      date: "",
      users: [
        {
          profilePicture: "",
          stats: {
            avgErrors: 1,
            avgAccuracy: 2,
            avgCPM: 3,
          },
          userId: "12345678901234",
          username: "Test 1",
        },
      ],
      _id: "google-oauth2|12345678901234",
      codeBlock: {
        code: "",
        _id: "12345678901234",
        time: "30",
        language: "javascript",
      },
    },
    {
      date: "",
      users: [
        {
          profilePicture: "",
          stats: {
            avgErrors: 4,
            avgAccuracy: 5,
            avgCPM: 6,
          },
          userId: "google-oauth2|12345678901234",
          username: "Test 2",
        },
        {
          profilePicture: "",
          stats: {
            avgErrors: 0,
            avgAccuracy: 0,
            avgCPM: 0,
          },
          userId: "12345678901234",
          username: "Test 3",
        },
      ],
      _id: "12345678901234",
      codeBlock: {
        code: "",
        _id: "12345678901234",
        time: "30",
        language: "javascript",
      },
    },
  ];

  beforeEach(() => {
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      buildAuthorizeUrl: jest.fn(),
      error: undefined,
      getAccessTokenWithPopup: jest.fn(),
      buildLogoutUrl: jest.fn(),
      getAccessTokenSilently: jest.fn(),
      getIdTokenClaims: jest.fn(),
      handleRedirectCallback: jest.fn(),
      loginWithPopup: jest.fn(),
      user,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    });
  });

  it("should render", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <ProfileMatchHistory matches={dummyMatchHistory} />
      </MemoryRouter>
    );

    expect(baseElement).toBeInTheDocument();
  });

  it("should correctly render solo match history item", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProfileMatchHistory matches={[dummyMatchHistory[0]]} />
      </MemoryRouter>
    );

    expect(getByText("Test 1")).toBeInTheDocument();

    expect(getByText("CPM")).toBeInTheDocument();
    expect(getByText("ACU")).toBeInTheDocument();
    expect(getByText("ERR")).toBeInTheDocument();

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
  });

  it("should correctly render multi match history item", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProfileMatchHistory matches={[dummyMatchHistory[1]]} />
      </MemoryRouter>
    );

    expect(getByText("Test 2 and more")).toBeInTheDocument();

    expect(getByText("CPM")).toBeInTheDocument();
    expect(getByText("ACU")).toBeInTheDocument();
    expect(getByText("ERR")).toBeInTheDocument();

    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
    expect(getByText("6")).toBeInTheDocument();
  });

  it("should render matches from last to first", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProfileMatchHistory
          matches={[dummyMatchHistory[1], dummyMatchHistory[0]]}
        />
      </MemoryRouter>
    );

    expect(getByText("Test 2 and more")).toBeInTheDocument();
    expect(getByText("Test 1")).toBeInTheDocument();
  });
});
