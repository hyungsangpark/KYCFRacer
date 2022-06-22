import {render} from "@testing-library/react";
import Header from "../Header";
import {MemoryRouter} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import mocked = jest.mocked;

const user = {
    email: "johndoe@me.com",
    email_verified: true,
    sub: "google-oauth2|12345678901234",
};

jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0, true);

describe("Header", () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: false,
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
    })

    it("should render", () => {
        const {baseElement} = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )

        expect(baseElement).toBeDefined();
    });

    it("should correctly render logo and name", () => {
        const {getByText} = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )

        expect(getByText("$")).toBeInTheDocument();
        expect(getByText("CodeRacer")).toBeInTheDocument();
    })

    it("should correctly render login", () => {
        const {getByText} = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )
        expect(getByText("Login")).toBeInTheDocument();
    })
});
