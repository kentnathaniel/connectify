import { Flex, Icon, Link } from "@/components/index";
import { ReactElement } from "react";
import ConnectifyLogo from "@/assets/connectify-logo.svg?react";
import { PATH } from "@/constants/path";

function Navbar(props: { menu?: ReactElement }) {
  const { menu } = props;

  return (
    <Flex py={4} mx="auto" justifyContent="space-between" align="center">
      <Link to={PATH.HOME} h={12}>
        <Icon as={ConnectifyLogo} w={40} h={12} />
      </Link>
      {menu}
    </Flex>
  );
}

export default Navbar;
